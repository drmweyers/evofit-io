import type { Metadata } from 'next';
import { listPostsByTag, getAllTags } from '@/lib/blog/reader';
import PostCard from '@/components/blog/PostCard';
import Link from 'next/link';

interface TagArchivePageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagArchivePageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged: ${tag} — EvoFit Blog`,
    description: `Browse all EvoFit blog posts tagged with "${tag}".`,
  };
}

export default async function TagArchivePage({ params }: TagArchivePageProps) {
  const { tag } = await params;
  const posts = await listPostsByTag(tag);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/blog"
          className="text-sm text-slate-500 hover:text-sky-600 transition-colors mb-4 inline-block"
        >
          ← All posts
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Posts tagged:{' '}
          <span className="text-sky-600">#{tag}</span>
        </h1>
        <p className="mt-2 text-slate-500">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-slate-500 text-lg">
            No posts found for tag &ldquo;{tag}&rdquo;.
          </p>
          <Link
            href="/blog"
            className="mt-4 inline-block text-sky-600 hover:text-sky-700 font-medium"
          >
            View all posts →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

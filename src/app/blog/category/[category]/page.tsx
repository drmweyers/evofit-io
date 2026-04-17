import type { Metadata } from 'next';
import Link from 'next/link';
import { listPostsByCategory, getAllCategories } from '@/lib/blog/reader';
import { slugifyCategory } from '@/lib/blog/schema';
import PostCard from '@/components/blog/PostCard';

export const revalidate = 3600;
export const dynamicParams = true;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ category: slugifyCategory(cat) }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const displayName = decodeURIComponent(category).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${displayName} — EvoFit Blog`,
    description: `Browse ${displayName} articles on the EvoFit blog.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const allCategories = await getAllCategories();
  // Match the slug back to the original category name
  const matchedCategory = allCategories.find((c) => slugifyCategory(c) === category) || category;
  const posts = await listPostsByCategory(matchedCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <Link href="/blog" className="text-sm text-[var(--color-brand-accent)] hover:underline font-display uppercase tracking-wider">
          &larr; All Posts
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide mt-3">
          {matchedCategory}
        </h1>
        <p className="text-white/50 mt-2">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-white/40 text-lg">No articles in this category yet.</p>
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

import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/blog/schema';

interface PostCardProps {
  post: Post;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-200">
      {/* Hero image */}
      <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
        <Image
          src={post.hero_image}
          alt={post.hero_image_alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-block rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 hover:bg-sky-100 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>{post.author.name}</span>
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
        </div>
      </div>
    </article>
  );
}

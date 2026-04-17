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
    <article className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-[var(--color-brand-accent)]/30 hover:bg-white/[0.07] transition-all duration-200">
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
                className="inline-block rounded-full border border-[var(--color-brand-accent)]/30 bg-[var(--color-brand-accent)]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)]/20 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-display font-semibold uppercase tracking-wide text-white mb-2 group-hover:text-[var(--color-brand-accent)] transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-white/60 text-sm leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
          <span>{post.author.name}</span>
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
        </div>
      </div>
    </article>
  );
}

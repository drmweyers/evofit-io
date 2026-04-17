import Image from 'next/image';
import { Post } from '@/lib/blog/schema';

interface PostHeaderProps {
  post: Post;
  readingTimeMin?: number;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostHeader({ post, readingTimeMin }: PostHeaderProps) {
  return (
    <header className="relative w-full">
      {/* Full-bleed hero image with gradient overlay */}
      <div className="relative h-72 sm:h-96 lg:h-[28rem] w-full overflow-hidden">
        <Image
          src={post.hero_image}
          alt={post.hero_image_alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      </div>

      {/* Title and meta overlaid on gradient */}
      <div className="relative -mt-40 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-10">
        <div className="relative z-10">
          {/* Tags above title */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full border border-[var(--color-brand-accent)]/30 bg-[var(--color-brand-accent)]/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-white/60 text-sm">
            <span className="font-medium text-white/80">{post.author.name}</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            {readingTimeMin && (
              <>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span>{readingTimeMin} min read</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

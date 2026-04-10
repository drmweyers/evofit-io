import Image from 'next/image';
import { Post } from '@/lib/blog/schema';

interface PostHeaderProps {
  post: Post;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="relative w-full">
      {/* Full-bleed hero image with gradient overlay */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
        <Image
          src={post.hero_image}
          alt={post.hero_image_alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Title and meta overlaid on gradient */}
      <div className="relative -mt-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-8">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-slate-300 text-sm">
            <span>{post.author.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          </div>
        </div>
      </div>
    </header>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/blog/schema';

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-white/10">
      <h2 className="font-display text-xl uppercase tracking-wider text-white mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:border-[var(--color-brand-accent)]/30 hover:bg-white/[0.07] transition-all"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={post.hero_image}
                alt={post.hero_image_alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-brand-accent)]/70">
                {post.category}
              </span>
              <h3 className="text-sm font-display uppercase tracking-wide text-white mt-1 line-clamp-2 group-hover:text-[var(--color-brand-accent)] transition-colors">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

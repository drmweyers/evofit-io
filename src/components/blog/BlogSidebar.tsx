import Link from 'next/link';
import { slugifyCategory } from '@/lib/blog/schema';
import type { Post } from '@/lib/blog/schema';
import type { MonthArchive } from '@/lib/blog/reader';

interface BlogSidebarProps {
  categories: string[];
  archives: MonthArchive[];
  recentPosts: Post[];
}

export default function BlogSidebar({ categories, archives, recentPosts }: BlogSidebarProps) {
  return (
    <aside className="space-y-10">
      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/blog/category/${slugifyCategory(cat)}`}
                  className="text-sm text-white/70 hover:text-[var(--color-brand-accent)] transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Monthly Archive */}
      {archives.length > 0 && (
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Archive</h3>
          <ul className="space-y-2">
            {archives.map((a) => (
              <li key={`${a.year}-${a.month}`}>
                <Link
                  href={`/blog?month=${a.year}-${String(a.month + 1).padStart(2, '0')}`}
                  className="text-sm text-white/70 hover:text-[var(--color-brand-accent)] transition-colors flex justify-between"
                >
                  <span>{a.label}</span>
                  <span className="text-white/30">{a.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Recent Posts</h3>
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <span className="text-sm text-white/70 group-hover:text-[var(--color-brand-accent)] transition-colors line-clamp-2">
                    {post.title}
                  </span>
                  <span className="text-xs text-white/30">
                    {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

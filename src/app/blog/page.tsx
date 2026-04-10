import type { Metadata } from 'next';
import { Rss } from 'lucide-react';
import Link from 'next/link';
import { listPosts } from '@/lib/blog/reader';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/blog/Pagination';

const PAGE_SIZE = 12;

export const metadata: Metadata = {
  title: 'Blog — EvoFit',
  description: 'AI-powered fitness insights, nutrition science, and business tips for fitness coaches.',
  alternates: {
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
  openGraph: {
    title: 'Blog — EvoFit',
    description: 'AI-powered fitness insights, nutrition science, and business tips for fitness coaches.',
    type: 'website',
    url: 'https://evofit.io/blog',
  },
};

interface BlogIndexPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? '1', 10));

  const allPosts = await listPosts({ includeDrafts: process.env.VERCEL_ENV === 'preview' });
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const posts = allPosts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // JSON-LD: Blog schema.org type
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'EvoFit Blog',
    url: 'https://evofit.io/blog',
    description: 'AI-powered fitness insights, nutrition science, and business tips for fitness coaches.',
    publisher: {
      '@type': 'Organization',
      name: 'EvoFit',
      url: 'https://evofit.io',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            EvoFit Blog{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
              — where fitness meets AI
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            AI-powered fitness insights, nutrition science, and business tips for coaches who want to stay ahead.
          </p>
          <Link
            href="/blog/rss.xml"
            className="inline-flex items-center gap-2 rounded-lg border border-orange-400/50 bg-orange-500/10 px-4 py-2 text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors"
          >
            <Rss className="w-4 h-4" />
            Subscribe via RSS
          </Link>
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-slate-500 text-lg">
              More soon — our AI pipeline is warming up.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                basePath="/blog"
              />
            )}
          </>
        )}
      </section>
    </>
  );
}

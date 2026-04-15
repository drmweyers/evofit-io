import type { Metadata } from 'next';
import Image from 'next/image';
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/(script)/gi, '<\\/$1') }}
      />

      {/* Hero */}
      <section className="relative w-full min-h-[520px] md:min-h-[600px] overflow-hidden flex items-center">
        {/* Background image — desktop */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/hero-gym.png"
            alt="EvoFit Blog hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Background image — mobile */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/hero-mobile.png"
            alt="EvoFit Blog hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Dark overlay matching homepage style */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-28 md:py-36">
          <div className="max-w-3xl">
            <p
              className="font-body text-brand-accent text-sm uppercase tracking-[0.18em] font-semibold mb-5"
            >
              The EvoFit Blog
            </p>
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-wide leading-[1.1] mb-6"
              style={{ textShadow: '0 2px 30px rgba(0,0,0,0.7)' }}
            >
              Fitness. Science.<br />Business.
            </h1>
            <p className="font-body text-lg md:text-xl font-light text-white/85 leading-relaxed mb-10 max-w-xl">
              AI-powered insights, nutrition science, and business playbooks for coaches who want to stay ahead.
            </p>
            <Link
              href="/blog/rss.xml"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-display font-semibold uppercase tracking-wider text-sm hover:bg-brand-accent transition-all duration-300"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            >
              <Rss className="w-4 h-4" />
              Subscribe via RSS
            </Link>
          </div>
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

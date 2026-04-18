import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readPost, listPosts, getRelatedPosts, getAdjacentPosts, PostNotFoundError } from '@/lib/blog/reader';
import { slugifyCategory } from '@/lib/blog/schema';
import PostHeader from '@/components/blog/PostHeader';
import PostBody from '@/components/blog/PostBody';
import TableOfContents from '@/components/blog/TableOfContents';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ShareLinks from '@/components/blog/ShareLinks';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import AuthorBio from '@/components/blog/AuthorBio';

export const revalidate = 3600;
export const dynamicParams = true;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await listPosts({ includeDrafts: false });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await readPost(slug);
    return {
      title: `${post.title} — EvoFit Blog`,
      description: post.excerpt,
      keywords: post.keywords.length > 0 ? post.keywords : post.tags,
      alternates: {
        canonical: `https://evofit.io/blog/${post.slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        url: `https://evofit.io/blog/${post.slug}`,
        publishedTime: post.published_at,
        modifiedTime: post.updated_at,
        images: [{ url: post.hero_image, alt: post.hero_image_alt, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.hero_image],
      },
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await readPost(slug);
  } catch (e) {
    if (e instanceof PostNotFoundError) notFound();
    throw e;
  }

  const allPosts = await listPosts({ includeDrafts: false });
  const related = getRelatedPosts(post, allPosts, 3);
  const { prev, next } = getAdjacentPosts(post, allPosts);
  const postUrl = `https://evofit.io/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    keywords: post.keywords.join(', '),
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.avatar ? { image: post.author.avatar } : {}),
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: post.hero_image,
    publisher: {
      '@type': 'Organization',
      name: 'EvoFit',
      url: 'https://evofit.io',
      logo: { '@type': 'ImageObject', url: 'https://evofit.io/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.category || 'Uncategorized', href: `/blog/category/${slugifyCategory(post.category || 'uncategorized')}` },
    { label: post.title },
  ];

  return (
    <>
      <ReadingProgressBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/(script)/gi, '<\/$1') }}
      />

      {/* Fixed back-to-blog bar — sits below the navbar (h-16 = 64px) */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-wider text-white/60 hover:text-[var(--color-brand-accent)] transition-colors"
          >
            &larr; Back to Blog
          </Link>
          <span className="text-xs text-white/40 hidden sm:block truncate max-w-[50%]">{post.title}</span>
        </div>
      </div>

      <article className="bg-black min-h-screen pt-10">
        <PostHeader post={post} readingTimeMin={post.readingTimeMin} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
            {/* Main content column */}
            <div className="max-w-4xl">
              {/* Mobile ToC */}
              <div className="lg:hidden">
                <TableOfContents headings={post.headings} />
              </div>

              <PostBody html={post.html} />

              {/* Author bio */}
              <div className="mt-12">
                <AuthorBio author={post.author} />
              </div>

              {/* Share + back */}
              <footer className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                <ShareLinks url={postUrl} title={post.title} />
                <Link
                  href="/blog"
                  className="text-[var(--color-brand-accent)] hover:text-white font-display font-semibold uppercase tracking-wider text-sm transition-colors"
                >
                  &larr; Back to Blog
                </Link>
              </footer>

              {/* Previous / Next navigation */}
              {(prev || next) && (
                <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prev ? (
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="group flex flex-col gap-1 rounded-lg border border-white/10 p-4 hover:border-[var(--color-brand-accent)]/40 transition-colors"
                    >
                      <span className="text-xs text-white/40 uppercase tracking-wider font-display">&larr; Previous</span>
                      <span className="text-sm text-white/80 group-hover:text-[var(--color-brand-accent)] transition-colors line-clamp-2">{prev.title}</span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="group flex flex-col gap-1 rounded-lg border border-white/10 p-4 hover:border-[var(--color-brand-accent)]/40 transition-colors text-right"
                    >
                      <span className="text-xs text-white/40 uppercase tracking-wider font-display">Next &rarr;</span>
                      <span className="text-sm text-white/80 group-hover:text-[var(--color-brand-accent)] transition-colors line-clamp-2">{next.title}</span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </nav>
              )}

              {/* Related posts */}
              <RelatedPosts posts={related} />
            </div>

            {/* Desktop ToC sidebar */}
            <aside className="hidden lg:block">
              <TableOfContents headings={post.headings} />
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}

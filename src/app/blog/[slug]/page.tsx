import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readPost, listPosts, getRelatedPosts, PostNotFoundError } from '@/lib/blog/reader';
import { slugifyCategory } from '@/lib/blog/schema';
import PostHeader from '@/components/blog/PostHeader';
import PostBody from '@/components/blog/PostBody';
import TableOfContents from '@/components/blog/TableOfContents';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ShareLinks from '@/components/blog/ShareLinks';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import AuthorBio from '@/components/blog/AuthorBio';

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

  // Get related posts at build time
  const allPosts = await listPosts({ includeDrafts: false });
  const related = getRelatedPosts(post, allPosts, 3);
  const postUrl = `https://evofit.io/blog/${post.slug}`;

  // JSON-LD
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

      <article className="bg-black min-h-screen">
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

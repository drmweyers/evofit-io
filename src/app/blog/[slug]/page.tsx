import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readPost, listPosts, PostNotFoundError } from '@/lib/blog/reader';
import PostHeader from '@/components/blog/PostHeader';
import PostBody from '@/components/blog/PostBody';

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
        images: [
          {
            url: post.hero_image,
            alt: post.hero_image_alt,
            width: 1200,
            height: 630,
          },
        ],
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
    if (e instanceof PostNotFoundError) {
      notFound();
    }
    throw e;
  }

  // JSON-LD: Article schema.org type
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
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
      logo: {
        '@type': 'ImageObject',
        url: 'https://evofit.io/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://evofit.io/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/(script)/gi, '<\/$1') }}
      />

      <article className="bg-black min-h-screen">
        <PostHeader post={post} readingTimeMin={post.readingTimeMin} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Body */}
          <PostBody html={post.html} />

          {/* Author + share footer */}
          <footer className="mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-accent)]/20 flex items-center justify-center text-[var(--color-brand-accent)] font-display font-bold text-sm">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{post.author.name}</p>
                  <p className="text-white/40 text-xs">EvoFit</p>
                </div>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] hover:text-white font-display font-semibold uppercase tracking-wider text-sm transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}

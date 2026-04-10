import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readPost, listPosts, PostNotFoundError } from '@/lib/blog/reader';
import PostHeader from '@/components/blog/PostHeader';
import PostBody from '@/components/blog/PostBody';
import TagPill from '@/components/blog/TagPill';

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
      title: post.title,
      description: post.excerpt,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <PostHeader post={post} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          )}

          {/* Body */}
          <PostBody html={post.html} />

          {/* Back to blog */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { postContent } from '@/lib/content/posts';
import { authorContent } from '@/lib/content/authors';
import { RenderMDX } from '@/lib/content/mdx';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { TableOfContents } from '@/components/features/blog/TableOfContents';
import { RelatedPosts } from '@/components/features/blog/RelatedPosts';
import { AuthorProfileCard } from '@/components/features/authors/AuthorProfileCard';
import JsonLd from '@/components/seo/JsonLd';
import { getBlogPostingSchema } from '@/lib/seo/schemas';
import { constructMetadata } from '@/lib/seo/metadata';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, category: string, slug: string }> }) {
  const { locale, category, slug } = await params;
  const post = postContent.getPostBySlug(slug, locale, category);
  
  if (!post) return {};

  return constructMetadata({
    title: post.title,
    description: post.description,
    path: `/${locale === 'en' ? '' : locale}/blog/${category}/${slug}`,
    image: `/blog/${category}/${slug}/opengraph-image`,
    locale,
  });
}

export default async function PostPage(props: { params: Promise<{ locale: string, category: string, slug: string }> }) {
  const params = await props.params;
  const { locale, category, slug } = params;
  setRequestLocale(locale);
  
  const post = postContent.getPostBySlug(slug, locale, category);
  if (!post) notFound()

  const t = await getTranslations('Blog');
  const navT = await getTranslations('Navigation');
  const authorData = authorContent.getAuthorById(post.author);
  
  const jsonLdData = getBlogPostingSchema({
    title: post.title,
    description: post.description,
    date: post.date,
    authorName: authorData?.name || 'Admin',
    authorUrl: `/authors/${post.author}`,
    url: `/blog/${category}/${slug}`,
    image: `/blog/${category}/${slug}/opengraph-image`
  });

  const breadcrumbs = [
    { label: navT('home'), href: `/` },
    { label: navT('blog'), href: `/blog` },
    { label: post.category, href: `/blog?category=${post.category}` },
    { label: post.title, href: `/blog/${category}/${slug}`, active: true },
  ];

  // Fetch related posts (same category, exclude current)
  const relatedPosts = postContent
    .getPostsByCategory(category, locale)
    .filter(p => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="max-w-5xl mx-auto py-16 px-6 font-sans">
      <JsonLd schema={jsonLdData} />
      <Breadcrumbs items={breadcrumbs} />

      <header className="mb-10 mt-6 lg:text-center">
        <span className="text-sm font-bold text-blue-600 tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">{post.category}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-6 mb-6 text-gray-900 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center lg:justify-center gap-4 text-gray-500 font-medium text-sm">
          <time dateTime={post.date}>
             {new Date(post.date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { dateStyle: 'long' })}
          </time>
          <span>•</span>
          <span>{post.readingTime} {t('minRead')}</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 mt-12 w-full">
        {/* Main Content */}
        <div className="lg:w-[70%]">
          <div className="prose prose-lg prose-blue max-w-none text-gray-800">
            <RenderMDX content={post.content} />
          </div>

          <div className="mt-16">
            {authorData && <AuthorProfileCard author={authorData} lang={locale} />}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-[30%] space-y-8">
           <TableOfContents content={post.content} />
        </aside>
      </div>

      <div>
         <h3 className="text-3xl font-bold mb-8 mt-12">{t('relatedArticles')}</h3>
         <RelatedPosts posts={relatedPosts} lang={locale} />
      </div>
    </article>
  )
}

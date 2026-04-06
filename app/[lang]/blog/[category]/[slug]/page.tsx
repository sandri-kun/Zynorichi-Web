import { notFound } from 'next/navigation';
import { postContent } from '@/lib/content/posts';
import { authorContent } from '@/lib/content/authors';
import { RenderMDX } from '@/lib/content/mdx';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { TableOfContents } from '@/components/features/blog/TableOfContents';
import { RelatedPosts } from '@/components/features/blog/RelatedPosts';
import { AuthorProfileCard } from '@/components/features/authors/AuthorProfileCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBlogPostingJsonLd } from '@/lib/seo/schemas';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateOGImage } from '@/lib/seo/opengraph';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string, category: string, slug: string }> }) {
  const { lang, category, slug } = await params;
  const post = postContent.getPostBySlug(slug, lang, category);
  
  if (!post) return {};

  return constructMetadata({
    title: post.title,
    description: post.description,
    path: `/${lang}/blog/${category}/${slug}`,
    image: generateOGImage(post.title, post.category),
  });
}

export default async function PostPage(props: { params: Promise<{ lang: string, category: string, slug: string }> }) {
  const params = await props.params;
  const { lang, category, slug } = params;
  
  const post = postContent.getPostBySlug(slug, lang, category);
  if (!post) notFound()

  const authorData = authorContent.getAuthorById(post.author);
  
  const jsonLdData = generateBlogPostingJsonLd(post, authorData);

  const breadcrumbs = [
    { label: 'Home', path: `/${lang}` },
    { label: 'Blog', path: `/${lang}/blog` },
    { label: post.category, path: `/${lang}/blog?category=${post.category}` },
    { label: post.title, path: `/${lang}/blog/${category}/${slug}` },
  ];

  // Fetch related posts (same category, exclude current)
  const relatedPosts = postContent
    .getPostsByCategory(category, lang)
    .filter(p => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="max-w-5xl mx-auto py-16 px-6 font-sans">
      <JsonLd data={jsonLdData} />
      <Breadcrumbs items={breadcrumbs} />

      <header className="mb-10 mt-6 lg:text-center">
        <span className="text-sm font-bold text-blue-600 tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">{post.category}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-6 mb-6 text-gray-900 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center lg:justify-center gap-4 text-gray-500 font-medium text-sm">
          <time dateTime={post.date}>
             {new Date(post.date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { dateStyle: 'long' })}
          </time>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 mt-12 w-full">
        {/* Main Content */}
        <div className="lg:w-[70%]">
          <div className="prose prose-lg prose-blue max-w-none text-gray-800">
            <RenderMDX content={post.content} />
          </div>

          <div className="mt-16">
            {authorData && <AuthorProfileCard author={authorData} lang={lang} />}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-[30%] space-y-8">
           <TableOfContents content={post.content} />
        </aside>
      </div>

      <RelatedPosts posts={relatedPosts} lang={lang} />
    </article>
  )
}
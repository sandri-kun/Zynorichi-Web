import { posts, authors } from 'content'
import { notFound } from 'next/navigation'
import { AuthorProfile } from '@/components/blog/AuthorProfile'
import { MDXContent } from '@/components/mdx/MDXContent'
import { unstable_noStore as noStore } from 'next/cache'

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function PostPage(props: { params: Promise<{ lang: string, category: string, slug: string }> }) {
  noStore();
  const params = await props.params;
  const { lang, category, slug } = params;
  
  const post = posts.find((p) => 
    p.lang === lang && 
    p.category === category && 
    p.slug.endsWith(slug)
  )

  if (!post) notFound()

  // Relasi Data Author
  const authorData = authors.find((a) => a.id === post.author)

  return (
    <article className="max-w-3xl mx-auto py-16 px-6 font-sans">
      <header className="mb-10 text-center">
        <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">{post.category}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-gray-900 leading-tight">
          {post.title}
        </h1>
        <time className="text-gray-500 font-medium">{new Date(post.date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { dateStyle: 'long' })}</time>
      </header>

      {authorData && <AuthorProfile author={authorData} />}

      <div className="prose prose-lg prose-blue max-w-none text-gray-800 mt-10">
        <MDXContent code={post.content} />
      </div>
    </article>
  )
}
import { posts } from 'content'
import Link from 'next/link'

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  
  // Koleksi di-filter berdasarkan parameter URL
  const filteredPosts = posts.filter(post => post.lang === params.lang)

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
        {params.lang === 'id' ? 'Artikel Terbaru' : 'Latest Articles'}
      </h1>
      
      {filteredPosts.length === 0 && (
        <p className="text-gray-500">Belum ada artikel untuk bahasa ini.</p>
      )}

      <div className="grid gap-6">
        {filteredPosts.map((post) => {
          const cleanSlug = post.slug.split('/').pop()
          return (
            <Link 
              key={post.slug} 
              href={`/${params.lang}/blog/${post.category}/${cleanSlug}`}
              className="p-6 border rounded-2xl hover:shadow-lg transition-all bg-white"
            >
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase rounded-md">{post.category}</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold uppercase rounded-md">{post.lang}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
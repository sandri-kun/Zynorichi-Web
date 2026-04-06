import Link from 'next/link';
import { postContent } from '@/lib/content/posts';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const filteredPosts = postContent.getPostsByLang(lang).slice(0, 6); // Latest 6 posts

  const breadcrumbs = [
    { label: 'Home', path: `/${lang}` }
  ];

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />
      
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {lang === 'id' ? 'Artikel Terbaru' : 'Latest Articles'}
        </h1>
        <p className="text-gray-600 mt-2">
          {lang === 'id' ? 'Temukan wawasan terbaru kami.' : 'Discover our latest insights.'}
        </p>
      </header>
      
      {filteredPosts.length === 0 ? (
        <p className="text-gray-500">Belum ada artikel untuk bahasa ini.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} lang={lang} />
          ))}
        </div>
      )}

      {filteredPosts.length > 0 && (
        <div className="mt-12 text-center">
          <Link href={`/${lang}/blog`} className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            {lang === 'id' ? 'Lihat Semua Artikel' : 'View All Articles'}
          </Link>
        </div>
      )}
    </main>
  );
}
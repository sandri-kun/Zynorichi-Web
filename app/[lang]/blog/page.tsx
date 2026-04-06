import { notFound } from 'next/navigation';
import { postContent } from '@/lib/content/posts';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Pagination } from '@/components/features/blog/Pagination';
import { constructMetadata } from '@/lib/seo/metadata';
import { POSTS_PER_PAGE } from '@/constants';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return constructMetadata({
    title: lang === 'id' ? 'Semua Artikel' : 'All Articles',
    description: lang === 'id' ? 'Kumpulan artikel blog lengkap.' : 'Complete collection of blog articles.',
    path: `/${lang}/blog`
  });
}

export default async function BlogIndexPage({ params, searchParams }: { params: Promise<{ lang: string }>, searchParams?: Promise<{ page?: string }> }) {
  const { lang } = await params;
  const sParams = await searchParams;
  
  const pageStr = sParams?.page;
  const currentPage = pageStr ? parseInt(pageStr, 10) : 1;
  if (isNaN(currentPage) || currentPage < 1) notFound();

  const allPosts = postContent.getPostsByLang(lang);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  
  if (currentPage > totalPages && totalPages > 0) notFound();

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const breadcrumbs = [
    { label: 'Home', path: `/${lang}` },
    { label: 'Blog', path: `/${lang}/blog` },
  ];

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />
      
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Blog</h1>
      </header>

      {currentPosts.length === 0 ? (
        <p className="text-gray-500">Belum ada artikel.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} lang={lang} />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/${lang}/blog`}
          />
        </>
      )}
    </main>
  );
}

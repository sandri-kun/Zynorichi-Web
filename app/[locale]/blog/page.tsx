import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { postContent } from '@/lib/content/posts';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Pagination } from '@/components/features/blog/Pagination';
import { constructMetadata } from '@/lib/seo/metadata';
import { POSTS_PER_PAGE } from '@/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  return constructMetadata({
    title: t('title'),
    description: t('description'),
    path: `/${locale === 'en' ? '' : locale}/blog`
  });
}

export default async function BlogIndexPage({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams?: Promise<{ page?: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sParams = await searchParams;
  const pageStr = sParams?.page;
  const currentPage = pageStr ? parseInt(pageStr, 10) : 1;
  
  if (isNaN(currentPage) || currentPage < 1) notFound();

  const t = await getTranslations('Blog');
  const navT = await getTranslations('Navigation');

  const allPosts = postContent.getPostsByLocale(locale);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  
  if (currentPage > totalPages && totalPages > 0) notFound();

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const breadcrumbs = [
    { label: navT('home'), path: `/` },
    { label: navT('blog'), path: `/blog` },
  ];

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />
      
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">{t('title')}</h1>
      </header>

      {currentPosts.length === 0 ? (
        <p className="text-gray-500">Belum ada artikel.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} lang={locale} />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/blog`}
          />
        </>
      )}
    </main>
  );
}

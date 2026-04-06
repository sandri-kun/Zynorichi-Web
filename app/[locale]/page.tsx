import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { postContent } from '@/lib/content/posts';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('HomePage');
  const navT = await getTranslations('Navigation');
  
  const filteredPosts = postContent.getPostsByLocale(locale).slice(0, 6);

  const breadcrumbs = [
    { label: navT('home'), href: `/`, active: true }
  ];

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />
      
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {t('title')}
        </h1>
        <p className="text-gray-600 mt-2">
          {t('description')}
        </p>
      </header>
      
      {filteredPosts.length === 0 ? (
        <p className="text-gray-500">{t('emptyState')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} lang={locale} />
          ))}
        </div>
      )}

      {filteredPosts.length > 0 && (
        <div className="mt-12 text-center">
          <Link href="/blog" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            {t('readMore')}
          </Link>
        </div>
      )}
    </main>
  );
}

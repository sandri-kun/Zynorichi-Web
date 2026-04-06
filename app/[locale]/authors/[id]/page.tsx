import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { authorContent } from '@/lib/content/authors';
import { postContent } from '@/lib/content/posts';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { AuthorProfileCard } from '@/components/features/authors/AuthorProfileCard';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import JsonLd from '@/components/seo/JsonLd';
import { getPersonSchema } from '@/lib/seo/schemas';
import { constructMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  const author = authorContent.getAuthorById(id);
  
  if (!author) return {};

  return constructMetadata({
    title: `Profil ${author.name}`,
    description: author.bio,
    path: `/${locale === 'en' ? '' : locale}/authors/${id}`,
    image: author.avatar,
    type: 'profile',
    locale,
  });
}

export default async function AuthorPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const author = authorContent.getAuthorById(id);
  if (!author) notFound();

  const navT = await getTranslations('Navigation');
  const t = await getTranslations('Blog');

  const authorPosts = postContent.getPostsByAuthor(id, locale);
  const jsonLdData = getPersonSchema({
    name: author.name,
    description: author.bio,
    image: author.avatar,
    url: `/authors/${id}`,
    sameAs: author.social ? Object.values(author.social) : []
  });

  const breadcrumbs = [
    { label: navT('home'), href: `/` },
    { label: navT('blog'), href: `/blog` },
    { label: author.name, href: `/authors/${id}`, active: true },
  ];

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <JsonLd schema={jsonLdData} />
      <Breadcrumbs items={breadcrumbs} />
      
      <AuthorProfileCard author={author} lang={locale} showLink={false} />

      <section className="mt-16">
        <h3 className="text-3xl font-bold mb-8">{locale === 'id' ? 'Artikel oleh' : 'Articles by'} {author.name}</h3>
        {authorPosts.length === 0 ? (
          <p className="text-gray-500">Belum ada artikel yang ditulis.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorPosts.map((post) => (
               <ArticleCard key={post.slug} post={post} lang={locale} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

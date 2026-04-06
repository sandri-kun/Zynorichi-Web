import { notFound } from 'next/navigation';
import { authorContent } from '@/lib/content/authors';
import { postContent } from '@/lib/content/posts';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { AuthorProfileCard } from '@/components/features/authors/AuthorProfileCard';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePersonJsonLd } from '@/lib/seo/schemas';
import { constructMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  const author = authorContent.getAuthorById(id);
  
  if (!author) return {};

  return constructMetadata({
    title: `Profil ${author.name}`,
    description: author.bio,
    path: `/${lang}/authors/${id}`,
    image: author.avatar,
    type: 'profile'
  });
}

export default async function AuthorPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  
  const author = authorContent.getAuthorById(id);
  if (!author) notFound();

  const authorPosts = postContent.getPostsByAuthor(id).filter(p => p.lang === lang);
  const jsonLdData = generatePersonJsonLd(author, lang);

  const breadcrumbs = [
    { label: 'Home', path: `/${lang}` },
    { label: 'Authors', path: `/${lang}/authors` },
    { label: author.name, path: `/${lang}/authors/${id}` },
  ];

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <JsonLd data={jsonLdData} />
      <Breadcrumbs items={breadcrumbs} />
      
      <AuthorProfileCard author={author} lang={lang} showLink={false} />

      <section className="mt-16">
        <h3 className="text-3xl font-bold mb-8">Artikel oleh {author.name}</h3>
        {authorPosts.length === 0 ? (
          <p className="text-gray-500">Belum ada artikel yang ditulis.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorPosts.map((post) => (
               <ArticleCard key={post.slug} post={post} lang={lang} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

import { postContent } from '@/lib/content/posts';
import { HomeClient } from './HomeClient';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Home({ 
  params, 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const posts = postContent.getPostsByLocale(locale);
  
  return <HomeClient initialPosts={posts} locale={locale} />;
}

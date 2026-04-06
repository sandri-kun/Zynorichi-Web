import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { postContent } from '@/lib/content/posts';
import { SUPPORTED_LANGS } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = postContent.getAllPosts();
  
  const postUrls = posts.map(post => ({
    url: `${siteConfig.url}/${post.lang}/blog/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const homeUrls = SUPPORTED_LANGS.map(lang => ({
    url: `${siteConfig.url}/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  const blogIndexUrls = SUPPORTED_LANGS.map(lang => ({
    url: `${siteConfig.url}/${lang}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...homeUrls, ...blogIndexUrls, ...postUrls];
}

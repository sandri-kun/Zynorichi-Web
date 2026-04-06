import { MetadataRoute } from 'next';
import { seoConfig } from '@/config/seo';
import { postContent } from '@/lib/content/posts';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = postContent.getAllPosts();
  
  const getFullUrl = (path: string, locale: string) => {
    // Standard Next-Intl with 'as-needed' prefixing
    const prefix = locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
      ? ''
      : `/${locale}`;
    return `${seoConfig.siteUrl}${prefix}${path}`;
  };

  const getAlternates = (path: string) => {
    const alternates: Record<string, string> = {};
    routing.locales.forEach(l => {
      alternates[l] = getFullUrl(path, l);
    });
    return alternates;
  };

  // 1. Post URLs
  const postUrls = posts.flatMap(post => {
    // Assuming posts have their own language specific content
    // We only include the post in its specific language for sitemap index
    // Or we can include all languages if they exist.
    // For now, let's include the post URL for each locale it belongs to.
    return {
      url: getFullUrl(`/blog/${post.category}/${post.slug}`, post.lang),
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: getAlternates(`/blog/${post.category}/${post.slug}`)
      }
    };
  });

  // 2. Static Page URLs (Home, Blog)
  const paths = ['', '/blog', '/about']; 
  const staticUrls = paths.flatMap(path => {
    return routing.locales.map(locale => ({
      url: getFullUrl(path, locale),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: path === '' ? 1.0 : 0.9,
      alternates: {
        languages: getAlternates(path)
      }
    }));
  });

  return [...staticUrls, ...postUrls];
}

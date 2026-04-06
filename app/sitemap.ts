import { MetadataRoute } from 'next';
import { seoConfig } from '@/config/seo';
import { postContent } from '@/lib/content/posts';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = postContent.getAllPosts();
  
  const getFullUrl = (path: string, locale: string) => {
    // Force explicit locale prefix to avoid cookie-based redirection and 404s
    // even for defaultLocale. Google prefers explicit URLs in Sitemaps.
    return `${seoConfig.siteUrl}/${locale}${path === '' ? '' : path}`;
  };

  /**
   * For posts with different slugs, we should only provide alternates 
   * if we can map them precisely. For now, we list posts individually 
   * with their own language context.
   */

  // 1. Post URLs
  const postUrls = posts.map(post => {
    return {
      url: getFullUrl(`/blog/${post.category}/${post.slug}`, post.lang),
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      // We only include self-referencing alternate here as slugs differ.
      alternates: {
        languages: {
          [post.lang]: getFullUrl(`/blog/${post.category}/${post.slug}`, post.lang)
        }
      }
    };
  });

  // 2. Static Page URLs (Home, Blog)
  const paths = ['', '/blog', '/about']; 
  const staticUrls = paths.flatMap(path => {
    return routing.locales.map(locale => {
      // Build alternates for static pages (which share the same base path)
      const alternates: Record<string, string> = {};
      routing.locales.forEach(l => {
        alternates[l] = getFullUrl(path, l);
      });

      return {
        url: getFullUrl(path, locale),
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: path === '' ? 1.0 : 0.9,
        alternates: {
          languages: alternates
        }
      };
    });
  });

  return [...staticUrls, ...postUrls];
}

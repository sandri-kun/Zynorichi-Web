import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { formatDateForSchema, getAbsoluteUrl } from "@/utils/seo-helpers";

export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Generates JSON-LD for a BlogPosting.
 */
export function getBlogPostingSchema(post: {
  title: string;
  description: string;
  date: string;
  lastModified?: string;
  image?: string;
  authorName: string;
  authorUrl: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": formatDateForSchema(post.date),
    "dateModified": formatDateForSchema(post.lastModified || post.date),
    "image": post.image ? getAbsoluteUrl(post.image, seoConfig.siteUrl) : getAbsoluteUrl(seoConfig.defaultOgImage, seoConfig.siteUrl),
    "author": {
      "@type": "Person",
      "name": post.authorName,
      "url": getAbsoluteUrl(post.authorUrl, seoConfig.siteUrl),
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": getAbsoluteUrl("/logo.png", seoConfig.siteUrl), // Ensure logo exists
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}

/**
 * Generates JSON-LD for a Person (Author).
 */
export function getPersonSchema(author: {
  name: string;
  description: string;
  image: string;
  url: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "description": author.description,
    "image": author.image,
    "url": getAbsoluteUrl(author.url, seoConfig.siteUrl),
    "sameAs": author.sameAs || [],
  };
}

/**
 * Generates JSON-LD for BreadcrumbList.
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": getAbsoluteUrl(item.item, seoConfig.siteUrl),
    })),
  };
}

/**
 * Generates JSON-LD for WebSite.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": seoConfig.siteName,
    "url": seoConfig.siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${seoConfig.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

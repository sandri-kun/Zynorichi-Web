import { siteConfig } from '@/config/site';
import { Post } from '@/types/post';
import { Author } from '@/types/author';

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function generateBlogPostingJsonLd(post: Post, author?: Author) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${post.lang}/blog/${post.category}/${post.slug}`,
    },
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: author ? {
      '@type': 'Person',
      name: author.name,
      url: author.website || `${siteConfig.url}/${post.lang}/authors/${author.id}`,
    } : {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };
}

export function generatePersonJsonLd(author: Author, lang: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: `${siteConfig.url}/${lang}/authors/${author.id}`,
    image: author.avatar,
    sameAs: [
      author.website,
      author.social?.twitter,
      author.social?.linkedin,
      author.social?.github,
    ].filter(Boolean),
    jobTitle: author.credentials?.title,
    worksFor: author.credentials?.company ? {
      '@type': 'Organization',
      name: author.credentials.company,
    } : undefined,
    description: author.bio,
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

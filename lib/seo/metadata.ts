import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { seoConfig } from '@/config/seo';
import { SEOMetadata } from '@/types/seo';

export function constructMetadata(
  options: Partial<SEOMetadata> & {
    path?: string;
    image?: string;
    type?: 'website' | 'article' | 'profile';
  } = {}
): Metadata {
  const {
    title = seoConfig.defaultTitle,
    description = seoConfig.description,
    path = '',
    image = seoConfig.defaultOgImage,
    type = 'website',
    keywords,
    robots
  } = options;

  const url = `${siteConfig.url}${path}`;

  return {
    title: {
      default: title,
      template: seoConfig.titleTemplate,
    },
    description,
    keywords: keywords || ['blog', 'tech', 'programming', ...siteConfig.name.split(' ')],
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    alternates: {
      canonical: url,
    },
    robots: robots || "index, follow",
    openGraph: {
      type,
      locale: seoConfig.locale,
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.social.twitter,
    },
  };
}

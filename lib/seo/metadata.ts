import { Metadata } from 'next';
import { seoConfig } from '@/config/seo';
import { getAbsoluteUrl } from '@/utils/seo-helpers';
import { routing } from '@/i18n/routing';

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string[];
  robots?: string;
  locale?: string;
}

export function constructMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title = seoConfig.defaultTitle,
    description = seoConfig.defaultDescription,
    path = '',
    image = seoConfig.defaultOgImage,
    type = 'website',
    keywords = [],
    robots = 'index, follow',
    locale = 'en'
  } = options;

  const url = getAbsoluteUrl(path, seoConfig.siteUrl);
  
  // Dynamic hreflang (alternates)
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    // If localePrefix is 'as-needed', defaultLocale usually doesn't have prefix.
    const prefix = (loc === routing.defaultLocale && routing.localePrefix === 'as-needed') 
      ? '' 
      : `/${loc}`;
    
    // Construct the path for this specific locale
    // We assume path provided is relative and locale-agnostic (e.g. '/blog/post-1')
    languages[loc] = getAbsoluteUrl(`${prefix}${path}`, seoConfig.siteUrl);
  });

  return {
    title: {
      default: title,
      template: seoConfig.titleTemplate,
    },
    description,
    keywords: keywords.length > 0 ? keywords : [seoConfig.siteName, 'blog', 'tech', 'programming'],
    authors: [{ name: seoConfig.author.name }],
    creator: seoConfig.author.name,
    alternates: {
      canonical: url,
      languages,
    },
    robots,
    openGraph: {
      type,
      locale: locale === 'en' ? seoConfig.locale.en : seoConfig.locale.id,
      url,
      title,
      description,
      siteName: seoConfig.siteName,
      images: [
        {
          url: getAbsoluteUrl(image, seoConfig.siteUrl),
          width: seoConfig.defaultOgImageWidth,
          height: seoConfig.defaultOgImageHeight,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getAbsoluteUrl(image, seoConfig.siteUrl)],
      creator: seoConfig.twitterHandle,
    },
    metadataBase: new URL(seoConfig.siteUrl),
  };
}

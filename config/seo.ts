import { siteConfig } from "./site";

export const seoConfig = {
  defaultTitle: siteConfig.name || 'Zynorichi',
  defaultDescription: siteConfig.description || 'Modern Blog Platform',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteName: siteConfig.name || 'Zynorichi',
  twitterHandle: '@zynorichi', // Update with actual handle
  defaultOgImage: '/static/og-default.jpg',
  defaultOgImageWidth: 1200,
  defaultOgImageHeight: 630,
  titleTemplate: `%s | ${siteConfig.name}`,
  locale: {
    en: 'en_US',
    id: 'id_ID'
  },
  author: {
    name: siteConfig.author?.name || 'Admin',
    url: '/about'
  }
};

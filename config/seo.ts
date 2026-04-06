import { siteConfig } from "./site";

export const seoConfig = {
  defaultTitle: siteConfig.name,
  titleTemplate: `%s | ${siteConfig.name}`,
  description: siteConfig.description,
  defaultOgImage: `${siteConfig.url}/static/og-default.jpg`,
  locale: "id_ID", // the primary locale
  alternateLocales: ["en_US"],
};

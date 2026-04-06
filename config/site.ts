export const siteConfig = {
  name: "Zynorichi",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  description: "Platform blog modern untuk artikel teknologi dan pengembangan perangkat lunak.",
  author: {
    name: "Zynorichi Team",
    twitter: "@zynorichi",
  },
  social: {
    twitter: "https://twitter.com/zynorichi",
    github: "https://github.com/zynorichi",
    linkedin: "https://linkedin.com/company/zynorichi",
  },
};

export type SiteConfig = typeof siteConfig;

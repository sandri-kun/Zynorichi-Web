export type OpenGraph = {
  title?: string;
  description?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
};

export type TwitterCard = {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  title?: string;
  description?: string;
  images?: string[];
  creator?: string;
};

export type SEOMetadata = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraph?: OpenGraph;
  twitter?: TwitterCard;
  robots?: string;
};

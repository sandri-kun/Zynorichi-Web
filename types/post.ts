export type Post = {
  title: string;
  slug: string;
  date: string;
  lang: string;
  category: string;
  author: string;
  description: string;
  content: string; // the raw content or HTML string
  image?: string;
  readingTime?: number; // Estimated reading time in minutes
  published?: boolean;
};

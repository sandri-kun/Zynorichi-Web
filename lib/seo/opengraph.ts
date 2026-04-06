import { siteConfig } from '@/config/site';

export function generateOGImage(title: string, category?: string) {
  // In a real app, this could point to an api/og route that generates an image
  // using @vercel/og based on the title and category parameters.
  // For now, we return a fallback static image or a parameterized URL string
  const encodedTitle = encodeURIComponent(title);
  const encodedCategory = category ? encodeURIComponent(category) : '';
  
  // Example dummy image API usage 
  return `${siteConfig.url}/api/og?title=${encodedTitle}&category=${encodedCategory}`;
}

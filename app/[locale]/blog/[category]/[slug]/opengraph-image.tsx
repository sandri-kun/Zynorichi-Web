import { ImageResponse } from 'next/og';
import { postContent } from '@/lib/content/posts';
import { generateDynamicOgImage } from '@/lib/seo/opengraph';

export const runtime = 'nodejs';

export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ locale: string, category: string, slug: string }> }) {
  const { locale, category, slug } = await params;
  const post = postContent.getPostBySlug(slug, locale, category);

  if (!post) {
      return generateDynamicOgImage('Zynorichi Blog', 'Exploring Technology and Programming');
  }

  return generateDynamicOgImage(post.title, post.description);
}

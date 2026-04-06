import { Post } from '@/types/post';
import { ArticleCard } from './ArticleCard';

interface RelatedPostsProps {
  posts: Post[];
  lang: string;
}

export function RelatedPosts({ posts, lang }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-16 pb-8 border-t pt-12">
      <h3 className="text-3xl font-bold mb-8">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <ArticleCard key={post.slug} post={post} lang={lang} />
        ))}
      </div>
    </section>
  );
}

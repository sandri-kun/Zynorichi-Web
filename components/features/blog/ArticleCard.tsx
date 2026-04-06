import { Link } from '@/i18n/navigation';
import { Post } from '@/types/post';
import { formatDate } from '@/utils/date';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  post: Post;
  lang: string;
}

export function ArticleCard({ post, lang }: ArticleCardProps) {
  return (
    <article className="group h-full">
      <Link href={`/blog/${post.category}/${post.slug}`} className="block h-full">
        <Card className="glass-card h-full flex flex-col p-0 overflow-hidden border-none shadow-none bg-transparent group-hover:shadow-2xl transition-all duration-500">
          {post.image && (
            <div className="relative aspect-video overflow-hidden border-b border-border/40">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          )}
          <CardHeader className="p-6 pb-2">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors uppercase text-[10px] tracking-widest font-bold">
                {post.category}
              </Badge>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <time>{formatDate(post.date, lang)}</time>
              </div>
            </div>
            <h2 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h2>
          </CardHeader>
          
          <CardContent className="px-6 py-2 flex-1">
            <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
              {post.description}
            </p>
          </CardContent>

          <CardFooter className="px-6 py-5 mt-auto border-t border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 opacity-70" />
                {post.readingTime || 5} min read
              </span>
            </div>
            <div className="text-primary text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              Read More
              <ArrowRight className="w-4 h-4" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </article>
  );
}

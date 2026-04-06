'use client';

import { Link } from '@/i18n/navigation';
import { Post } from '@/types/post';
import { formatDate } from '@/utils/date';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, CardAction } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight, Bookmark, Share2 } from 'lucide-react';
import { useZyno } from '@/context/ZynoContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  post: Post;
  lang: string;
}

export function ArticleCard({ post, lang }: ArticleCardProps) {
  const { bookmarks, toggleBookmark } = useZyno();
  const isBookmarked = bookmarks.includes(post.slug);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(post.slug);
  };

  return (
    <article className="article-tile group h-full">
      <Link href={`/blog/${post.category}/${post.slug}`} className="block h-full">
        <Card className="h-full flex flex-col p-0 border-none shadow-none bg-transparent overflow-visible">
          {post.image && (
            <div className="img-hover-zoom relative aspect-video mb-4 shadow-xl shadow-black/20 group-hover:shadow-primary/20 transition-all duration-500">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-3 right-3 flex gap-2">
                 <Button 
                    size="icon" 
                    variant="secondary" 
                    className={cn(
                      "w-8 h-8 rounded-xl glass border-none shadow-lg transform transition-all duration-300 scale-0 group-hover:scale-100",
                      isBookmarked ? "text-primary fill-primary scale-100" : "text-white hover:text-primary"
                    )}
                    onClick={handleBookmark}
                 >
                    <Bookmark className="w-4 h-4" />
                 </Button>
              </div>
            </div>
          )}

          <CardHeader className="p-0 mb-3 block">
            <CardAction className="hidden lg:block">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground/40 hover:text-primary">
                <Share2 className="w-4 h-4" />
              </Button>
            </CardAction>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 text-[10px] uppercase font-black tracking-widest px-2 py-0">
                {post.category}
              </Badge>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 font-bold uppercase tracking-tight">
                <Calendar className="w-3 h-3" />
                <time>{formatDate(post.date, lang)}</time>
              </div>
            </div>
            <CardTitle className="text-lg font-black leading-tight group-hover:text-primary transition-colors line-clamp-2 tracking-tight">
              {post.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 mb-4 flex-1">
            <CardDescription className="text-muted-foreground/60 text-xs line-clamp-2 leading-relaxed font-medium">
              {post.description}
            </CardDescription>
          </CardContent>

          <CardFooter className="p-0 mt-auto flex items-center justify-between pt-4 border-t border-border/5">
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {post.readingTime} MIN
              </span>
            </div>
            <div className="text-primary text-[11px] font-black flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500 uppercase tracking-widest">
              Explore
              <ArrowRight className="w-3 h-3" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </article>
  );
}

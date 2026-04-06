'use client';

import { Link } from '@/i18n/navigation';
import { Post } from '@/types/post';
import { formatDate } from '@/utils/date';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight, Bookmark, Share2, MoreHorizontal, User } from 'lucide-react';
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

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.origin + `/blog/${post.category}/${post.slug}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/blog/${post.category}/${post.slug}`);
    }
  };

  return (
    <article className="glass-panel p-4 article-card flex flex-col h-full rounded-xl cursor-pointer group hover:bg-primary/5 transition-all duration-300">
      <Link href={`/blog/${post.category}/${post.slug}`} className="flex flex-col h-full">
        {/* Image Zoom Container */}
        {post.image && (
          <div className="img-zoom rounded-lg mb-3 h-40 overflow-hidden relative shadow-lg shadow-black/20 group-hover:shadow-primary/10 transition-all duration-500">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}

        {/* Categories & Stats */}
        <div className="flex justify-between items-start mb-2.5">
          <Badge className="chip-modern bg-primary/10 text-primary border-none text-[9px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-lg active-category">
            {post.category}
          </Badge>
          <span className="text-muted-foreground/95 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {post.readingTime} min
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-extrabold mb-1.5 leading-tight group-hover:text-primary transition-colors line-clamp-2 tracking-tight">
          {post.title}
        </h3>
        <p className="text-muted-foreground/95 text-[11px] sm:text-xs mb-4 flex-grow line-clamp-2 leading-relaxed font-medium">
          {post.description}
        </p>

        {/* Footer: Author & Actions (Separator Line Matching Reference) */}
        <div className="flex items-center justify-between mt-auto border-t border-border/80 pt-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center shrink-0 border border-border/30">
               <User className="w-4 h-4 text-muted-foreground/95" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-tight truncate">{post.author}</p>
              <p className="text-[9px] text-muted-foreground/90 font-bold">{formatDate(post.date, lang)}</p>
            </div>
          </div>

          <div className="action-buttons-row flex items-center gap-1 shrink-0">
            <Button 
              size="icon" 
              variant="ghost" 
              className="w-8 h-8 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground/95 transition-all share-card-btn"
              onClick={handleShare}
              title="Share"
            >
              <Share2 className="w-3.5 h-3.5" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className={cn(
                "w-8 h-8 rounded-lg transition-all bookmark-card-btn",
                isBookmarked ? "text-primary bg-primary/10" : "text-muted-foreground/95 hover:bg-primary/10 hover:text-primary"
              )}
              onClick={handleBookmark}
              title={isBookmarked ? "Remove bookmark" : "Save"}
            >
              <Bookmark className={cn("w-3.5 h-3.5", isBookmarked && "fill-current")} />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="w-8 h-8 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground/95 transition-all read-more-card-btn"
              title="Read more"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
}

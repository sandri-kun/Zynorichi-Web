'use client';

import React, { useMemo } from 'react';
import { useZyno } from '@/context/ZynoContext';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import { useTranslations } from 'next-intl';
import { Post } from '@/types/post';
import { Sparkles, ArrowRight, Bookmark, CircleX, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HomePageProps {
  initialPosts: Post[];
  locale: string;
}

export function HomeClient({ initialPosts, locale }: HomePageProps) {
  const { searchQuery, setSearchQuery, activeCategory, setCategory, bookmarks, isOnlyBookmarks, setIsOnlyBookmarks } = useZyno();
  const t = useTranslations('HomePage');

  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      // Filter by category
      if (activeCategory !== 'all' && post.category?.toLowerCase() !== activeCategory.toLowerCase()) {
        return false;
      }
      
      // Filter by bookmarks
      if (isOnlyBookmarks && !bookmarks.includes(post.slug)) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) || 
          post.description.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [initialPosts, searchQuery, activeCategory, bookmarks, isOnlyBookmarks]);

  return (
    <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-1000">
      {/* Page Header (Matching main.html 333-336) */}
      <div className="mb-6 mt-1">
        <h1 id="pageTitle" className="text-xl sm:text-2xl lg:text-4xl font-black tracking-tighter text-foreground">
          {isOnlyBookmarks ? "Saved Articles" : "Discover"}
        </h1>
        <p id="pageSub" className="opacity-40 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-1.5">
          precision · search & save
        </p>
      </div>

      {/* Category Chips - Scrolling Filter */}
      <div className="mb-8 overflow-hidden">
        <div id="categoryContainer" className="flex items-center gap-1.5 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {['all', 'tech', 'anime', 'crypto'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setIsOnlyBookmarks(false);
              }}
              className={cn(
                 "chip-modern transition-all duration-300",
                 activeCategory === cat && !isOnlyBookmarks ? "active-category opacity-100" : "opacity-60 hover:opacity-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section>
        {filteredPosts.length === 0 ? (
          <div id="emptyState" className="text-center py-24 sm:py-32 flex flex-col items-center gap-4 bg-foreground/5 rounded-3xl border border-border/5">
            {isOnlyBookmarks ? <Bookmark className="w-12 h-12 text-muted-foreground/10" /> : <CircleX className="w-12 h-12 text-muted-foreground/10" />}
            <div className="space-y-1">
              <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No result found</p>
              <p className="text-[10px] text-muted-foreground/30 font-bold">Try adjusting filters or search query.</p>
            </div>
          </div>
        ) : (
          <div id="dynamicGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} lang={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

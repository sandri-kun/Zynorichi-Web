'use client';

import React, { useMemo } from 'react';
import { useZyno } from '@/context/ZynoContext';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import { useTranslations } from 'next-intl';
import { Post } from '@/types/post';
import { Sparkles, ArrowRight, Bookmark, CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Category Chips - Quick Filters (YouTube Style) */}
      <div className="flex flex-wrap gap-2 sticky top-[80px] z-40 py-4 bg-background/80 backdrop-blur-xl border-b border-border/10">
        {['all', 'tech', 'anime', 'crypto'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setIsOnlyBookmarks(false);
            }}
            className={activeCategory === cat ? "chip-modern-active" : "chip-modern"}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <header className="py-12 relative overflow-hidden glass-panel p-8 lg:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-6">
          <span className="flex items-center gap-1">
             <Sparkles className="w-3.5 h-3.5" />
             NEBULA EDITION
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
          {isOnlyBookmarks ? (
            <>Your Saved <span className="text-primary italic">Collections</span></>
          ) : (
            <>{t('title').split(' ').map((word, i) => i === 1 ? <span key={i} className="text-primary italic">{word} </span> : word + ' ')}</>
          )}
        </h1>
        <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed">
          {isOnlyBookmarks ? 'Revisit the insights and stories you tagged for later.' : t('description')}
        </p>
        
        {isOnlyBookmarks && (
          <Button 
            variant="ghost" 
            className="mt-8 text-primary font-bold hover:bg-primary/5"
            onClick={() => setIsOnlyBookmarks(false)}
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Feed
          </Button>
        )}
      </header>

      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight">
              {searchQuery ? `Search results for "${searchQuery}"` : 
               isOnlyBookmarks ? "Saved Articles" : 
               activeCategory !== 'all' ? `Latest in ${activeCategory}` : 
               "Editor's Picks"}
            </h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-bold">
              {filteredPosts.length}
            </span>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="glass-panel text-center py-32 flex flex-col items-center gap-4">
            {isOnlyBookmarks ? <Bookmark className="w-12 h-12 text-muted-foreground/20" /> : <CircleX className="w-12 h-12 text-muted-foreground/20" />}
            <div className="space-y-1">
              <p className="text-muted-foreground font-bold">No articles found</p>
              <p className="text-xs text-muted-foreground/40">Try adjusting your filters or search query.</p>
            </div>
            {(searchQuery || activeCategory !== 'all' || isOnlyBookmarks) && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 rounded-full border-primary/20 text-primary hover:bg-primary/5"
                onClick={() => {
                  setSearchQuery('');
                  setCategory('all');
                  setIsOnlyBookmarks(false);
                }}
              >
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} lang={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

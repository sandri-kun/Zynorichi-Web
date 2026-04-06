'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ZynoContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarks: string[];
  toggleBookmark: (slug: string) => void;
  activeCategory: string;
  setCategory: (cat: string) => void;
  isOnlyBookmarks: boolean;
  setIsOnlyBookmarks: (val: boolean) => void;
}

const ZynoContext = createContext<ZynoContextType | undefined>(undefined);

export function ZynoProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeCategory, setCategory] = useState('all');
  const [isOnlyBookmarks, setIsOnlyBookmarks] = useState(false);

  // Load bookmarks on mount
  useEffect(() => {
    const saved = localStorage.getItem('zynorichi-bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse bookmarks', e);
      }
    }
  }, []);

  // Save bookmarks on change
  useEffect(() => {
    localStorage.setItem('zynorichi-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (slug: string) => {
    setBookmarks(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug) 
        : [...prev, slug]
    );
  };

  return (
    <ZynoContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      bookmarks, 
      toggleBookmark, 
      activeCategory, 
      setCategory,
      isOnlyBookmarks,
      setIsOnlyBookmarks
    }}>
      {children}
    </ZynoContext.Provider>
  );
}

export function useZyno() {
  const context = useContext(ZynoContext);
  if (context === undefined) {
    throw new Error('useZyno must be used within a ZynoProvider');
  }
  return context;
}

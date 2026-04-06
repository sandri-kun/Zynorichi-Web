'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

interface ZynoContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarks: string[];
  toggleBookmark: (slug: string) => void;
  activeCategory: string;
  setCategory: (cat: string) => void;
  isOnlyBookmarks: boolean;
  setIsOnlyBookmarks: (val: boolean) => void;
  isDrawerExpanded: boolean;
  toggleDrawer: () => void;
  notifications: Notification[];
  addNotification: (msg: string) => void;
  clearNotifications: () => void;
}

const ZynoContext = createContext<ZynoContextType | undefined>(undefined);

export function ZynoProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeCategory, setCategory] = useState('all');
  const [isOnlyBookmarks, setIsOnlyBookmarks] = useState(false);
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load state on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('zynorichi-bookmarks');
    if (savedBookmarks) {
      try { setBookmarks(JSON.parse(savedBookmarks)); } catch (e) {}
    }

    const savedDrawer = localStorage.getItem('zynorichi-drawer');
    if (savedDrawer !== null) setIsDrawerExpanded(savedDrawer === 'true');

    const savedNotifs = localStorage.getItem('zynorichi-notifications');
    if (savedNotifs) {
      try { setNotifications(JSON.parse(savedNotifs)); } catch (e) {}
    }
  }, []);

  // Set Persistence
  useEffect(() => {
    localStorage.setItem('zynorichi-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('zynorichi-drawer', String(isDrawerExpanded));
  }, [isDrawerExpanded]);

  useEffect(() => {
    localStorage.setItem('zynorichi-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (msg: string) => {
    const newNotif = {
      id: Date.now(),
      message: msg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 15));
  };

  const clearNotifications = () => setNotifications([]);

  const toggleBookmark = (slug: string) => {
    const isAdding = !bookmarks.includes(slug);
    setBookmarks(prev => isAdding ? [...prev, slug] : prev.filter(s => s !== slug));
    addNotification(isAdding ? `📌 Saved article to bookmarks` : `❌ Removed from bookmarks`);
  };

  const toggleDrawer = () => setIsDrawerExpanded(prev => !prev);

  return (
    <ZynoContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      bookmarks, 
      toggleBookmark, 
      activeCategory, 
      setCategory,
      isOnlyBookmarks,
      setIsOnlyBookmarks,
      isDrawerExpanded,
      toggleDrawer,
      notifications,
      addNotification,
      clearNotifications
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

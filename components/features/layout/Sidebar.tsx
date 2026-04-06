'use client';

import React from 'react';
import { Home, Compass, Bookmark, LayoutGrid, Clock, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useZyno } from '@/context/ZynoContext';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { activeCategory, setCategory, isOnlyBookmarks, setIsOnlyBookmarks } = useZyno();
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const navItems = [
    { label: t('home'), href: '/', icon: Home },
    { label: 'Explore', href: '/#explore', icon: Compass },
  ];

  return (
    <aside className={cn("hidden lg:flex flex-col w-64 h-[calc(100vh-5rem)] sticky top-20 py-8 pr-6 gap-8", className)}>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOnlyBookmarks(false)}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-primary/5",
              pathname === item.href && !isOnlyBookmarks ? "bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", pathname === item.href && !isOnlyBookmarks && "text-primary")} />
            <span className="text-sm tracking-tight">{item.label}</span>
          </Link>
        ))}
        
        <button
          onClick={() => setIsOnlyBookmarks(!isOnlyBookmarks)}
          className={cn(
            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-primary/5 w-full text-left",
            isOnlyBookmarks ? "bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Bookmark className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isOnlyBookmarks && "text-primary fill-current")} />
          <span className="text-sm tracking-tight">Bookmarks</span>
        </button>
      </nav>

      <div className="flex flex-col gap-4">
        <div className="px-4 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Explore topics</span>
        </div>
        <div className="flex flex-col gap-1">
          {['all', 'tech', 'anime', 'crypto'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setIsOnlyBookmarks(false);
              }}
              className={cn(
                "flex items-center gap-4 px-4 py-2.5 rounded-xl text-sm transition-all group w-full text-left",
                activeCategory === cat ? "bg-primary/5 text-primary font-bold" : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              )}
            >
              <Hash className={cn("w-4 h-4 transition-all", activeCategory === cat ? "text-primary opacity-100" : "opacity-40 group-hover:opacity-100 group-hover:text-primary")} />
              <span className="capitalize">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto px-4 py-6 border-t border-border/40">
        <p className="text-[10px] text-muted-foreground/40 leading-relaxed font-medium">
          © 2025 NEBULA<br/>Precision Minimalist Blog
        </p>
      </div>
    </aside>
  );
}

'use client';

import React from 'react';
import { Home, Compass, Bookmark, LayoutGrid, Clock, Hash, Settings, Keyboard, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useZyno } from '@/context/ZynoContext';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { activeCategory, setCategory, isOnlyBookmarks, setIsOnlyBookmarks, isDrawerExpanded, toggleDrawer, bookmarks } = useZyno();
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const mainNav = [
    { label: t('home'), href: '/', icon: Home, id: 'home' },
    { label: 'Explore', href: '/#explore', icon: Compass, id: 'explore' },
  ];

  const categories = ['tech', 'anime', 'crypto'];

  return (
    <aside className={cn(
      "fixed lg:sticky top-0 lg:top-16 sm:lg:top-20 left-0 h-full lg:h-[calc(100vh-4rem)] sm:lg:h-[calc(100vh-5rem)] bg-background/80 lg:bg-background/50 backdrop-blur-3xl border-r border-border/40 z-[60] lg:z-40 drawer-transition overflow-y-auto overflow-x-hidden shadow-2xl lg:shadow-none",
      isDrawerExpanded ? "w-[280px] sm:w-[300px] lg:w-[260px]" : "w-[0px] lg:w-[72px]",
      className
    )}>
      <div className="flex flex-col py-4 px-3 h-full">
        {/* Mobile Header with Close Button */}
        <div className="flex lg:hidden items-center justify-between px-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-black tracking-tighter text-lg">ZYNORICHI</span>
          </div>
          <button 
            onClick={toggleDrawer}
            className="p-2 rounded-xl bg-foreground/5 text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                setIsOnlyBookmarks(false);
                if (window.innerWidth < 1024) toggleDrawer();
              }}
              className={cn(
                "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group hover:bg-foreground/5",
                pathname === item.href && !isOnlyBookmarks ? "bg-primary/10 text-primary font-bold" : "text-foreground/60 hover:text-foreground",
                !isDrawerExpanded && "lg:justify-center lg:px-0"
              )}
              title={!isDrawerExpanded ? item.label : ""}
            >
              <item.icon className={cn("w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110", pathname === item.href && !isOnlyBookmarks && "text-primary")} />
              {isDrawerExpanded && <span className="text-sm tracking-tight font-medium">{item.label}</span>}
            </Link>
          ))}
          
          <button
            onClick={() => {
              setIsOnlyBookmarks(!isOnlyBookmarks);
              if (window.innerWidth < 1024 && !isOnlyBookmarks) toggleDrawer();
            }}
            className={cn(
              "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group hover:bg-foreground/5 w-full text-left",
              isOnlyBookmarks ? "bg-primary/10 text-primary font-bold" : "text-foreground/60 hover:text-foreground",
              !isDrawerExpanded && "lg:justify-center lg:px-0"
            )}
            title={!isDrawerExpanded ? "Bookmarks" : ""}
          >
            <div className="relative">
              <Bookmark className={cn("w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110", isOnlyBookmarks && "text-primary fill-current")} />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[8px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </div>
            {isDrawerExpanded && (
              <div className="flex items-center justify-between flex-1">
                <span className="text-sm tracking-tight font-medium">Bookmarks</span>
              </div>
            )}
          </button>
        </nav>

        {/* Discover / Categories */}
        <div className={cn("mt-6 pt-6 border-t border-border/40", !isDrawerExpanded && "items-center")}>
          {isDrawerExpanded && (
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Discover</span>
              <Sparkles className="w-3 h-3 text-primary/40" />
            </div>
          )}
          <div className="space-y-0.5">
            {['all', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setIsOnlyBookmarks(false);
                  if (window.innerWidth < 1024) toggleDrawer();
                }}
                className={cn(
                  "flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 group w-full text-left",
                  activeCategory === cat && !isOnlyBookmarks ? "bg-primary/5 text-primary font-bold" : "text-foreground/50 hover:text-foreground hover:bg-foreground/5",
                  !isDrawerExpanded && "lg:justify-center lg:px-0"
                )}
                title={!isDrawerExpanded ? cat.toUpperCase() : ""}
              >
                <Hash className={cn("w-4 h-4 shrink-0 transition-all", activeCategory === cat && !isOnlyBookmarks ? "text-primary opacity-100" : "opacity-30 group-hover:opacity-100 group-hover:text-primary")} />
                {isDrawerExpanded && <span className="capitalize font-medium text-precision">{cat}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Shortcuts / Footer */}
        <div className="mt-auto pt-6 border-t border-border/40 space-y-1">
          <button className={cn(
            "flex items-center gap-4 px-3 py-3 rounded-xl text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all w-full",
            !isDrawerExpanded && "justify-center px-0"
          )} title="Settings">
            <Settings className="w-5 h-5 shrink-0" />
            {isDrawerExpanded && <span className="text-sm font-medium">Settings</span>}
          </button>

          {isDrawerExpanded && (
            <div className="px-3 py-4 mt-2">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-foreground/5 border border-border/30">
                <span className="text-[10px] text-muted-foreground/60 font-bold flex items-center gap-2">
                  <Keyboard className="w-3 h-3" /> Shortcuts
                </span>
                <span className="text-[10px] font-black opacity-30 tracking-widest uppercase">? K B</span>
              </div>
              <p className="mt-4 text-[10px] text-muted-foreground/30 leading-relaxed font-medium px-1">
                © {new Date().getFullYear()} ZYNORICHI<br/>Precision Minimalist Blog
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

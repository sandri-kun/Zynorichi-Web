'use client';

import React, { useEffect, useState } from 'react';
import { Search, Bell, User, Menu, X, Rocket, Command, Languages, Moon, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useZyno } from '@/context/ZynoContext';
import { useTheme } from 'next-themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
}

import { NotificationPanel } from '@/components/features/notifications/NotificationPanel';

export function Header({ onSearch, onMenuClick, isMenuOpen }: HeaderProps) {
  const { toggleDrawer, isDrawerExpanded, setSearchQuery, notifications } = useZyno();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "glass-nav transition-all duration-300 h-16 sm:h-20 flex items-center justify-between gap-4 px-4 sm:px-6 sticky top-0 z-50",
      isScrolled ? "bg-background/80 backdrop-blur-2xl border-b border-border/10 shadow-lg shadow-black/5" : "bg-transparent border-transparent"
    )}>
      {/* Left Section: Logo & Toggle */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-primary/10 text-foreground/70 hover:text-primary rounded-xl transition-all"
          onClick={toggleDrawer}
          title="Toggle drawer (D)"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <Link href="/" className="flex items-center gap-2 group ml-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-foreground hidden md:block">
            ZYNORICHI
          </span>
        </Link>
      </div>

      {/* Center Section: Search */}
      <div className="flex-1 max-w-2xl mx-auto relative group hidden sm:block">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 z-10 group-focus-within:text-primary transition-colors">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <Input
          type="text"
          placeholder="Search articles... (Ctrl+K)"
          className="w-full pl-11 pr-14 h-10 sm:h-12 rounded-full border-border/30 bg-foreground/5 focus-visible:bg-foreground/10 focus-visible:ring-primary/20 focus-visible:border-primary/40 transition-all text-sm sm:text-base selection:bg-primary/20 selection:text-primary"
          onChange={(e) => {
            onSearch?.(e.target.value);
            setSearchQuery(e.target.value);
          }}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-2 py-1 rounded-md bg-background/50 border border-border/40 text-[9px] font-black text-muted-foreground/50 tracking-widest uppercase">
          <Command className="w-2.5 h-2.5" /> K
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-2 border-r border-border/10 pr-3 mr-1 h-8">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>

        {/* Mobile Search/Theme Toggle */}
        <Button variant="ghost" size="icon" className="sm:hidden rounded-xl">
           <Search className="w-5 h-5 text-muted-foreground/60" />
        </Button>

        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "relative rounded-xl hover:bg-primary/5 hover:text-primary transition-all",
              isNotifOpen && "bg-primary/10 text-primary"
            )}
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <Bell className="w-5 h-5 text-muted-foreground/60 transition-colors" />
            {notifications.length > 0 && (
              <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-primary text-[8px] font-black text-white flex items-center justify-center rounded-full border-2 border-background animate-in zoom-in duration-300">
                {notifications.length > 9 ? '9+' : notifications.length}
              </span>
            )}
          </Button>

          <NotificationPanel 
            isOpen={isNotifOpen} 
            onClose={() => setIsNotifOpen(false)} 
          />
        </div>

        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-primary/80 to-primary p-[1px] group cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all shadow-md">
          <div className="w-full h-full rounded-[15px] bg-background flex items-center justify-center overflow-hidden">
             <User className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/60" />
          </div>
        </div>
      </div>
    </header>
  );
}

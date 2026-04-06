'use client';

import React from 'react';
import { Search, Bell, User, Menu, X, Rocket } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
}

export function Header({ onSearch, onMenuClick, isMenuOpen }: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  return (
    <header className="glass-nav sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between gap-4 h-20">
      <div className="flex items-center gap-4 lg:gap-6 shrink-0">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
            <Rocket className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-foreground hidden sm:block">
            NEBULA<span className="text-primary italic">richi</span>
          </span>
        </Link>
      </div>

      <div className={cn(
        "max-w-2xl w-full mx-auto relative transition-all duration-500 group hidden md:block",
        isSearchFocused ? "scale-[1.02]" : "scale-100"
      )}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
          <Search className={cn("w-5 h-5 transition-colors", isSearchFocused && "text-primary")} />
        </div>
        <Input
          type="text"
          placeholder="Search articles, topics, authors..."
          className={cn(
            "w-full pl-12 pr-4 h-12 rounded-2xl border-border/40 bg-muted/30 focus-visible:bg-muted/50 focus-visible:ring-primary/20 focus-visible:border-primary/40 transition-all text-base",
            isSearchFocused && "shadow-xl shadow-primary/5"
          )}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-background/50 border border-border/40 text-[10px] font-bold text-muted-foreground">
          <span className="opacity-50">CTRL</span> + <span className="opacity-50">K</span>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4 shrink-0">
        <div className="hidden lg:flex items-center gap-4 border-r border-border/40 pr-4 mr-2 h-8">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-primary/5 hover:text-primary">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary/60 p-[1px] group cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all shadow-md">
          <div className="w-full h-full rounded-[15px] bg-background flex items-center justify-center overflow-hidden">
             <User className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}

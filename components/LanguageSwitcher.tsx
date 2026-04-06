'use client';

import { useLocale } from 'next-intl';
import { useTransition, useState } from 'react';
import { cn } from '@/lib/utils';
import { Globe, ChevronDown } from "lucide-react";
import { Button } from '@/components/ui/button';
import { LanguagePanel } from './features/layout/LanguagePanel';

export function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm"
        className={cn(
          "h-9 px-3 gap-2 flex items-center justify-between rounded-full hover:bg-primary/5 transition-all",
          isOpen && "bg-primary/10 text-primary"
        )}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
      >
        <Globe className={cn("w-5 h-5 text-muted-foreground/60 transition-colors", isPending && "animate-spin")} />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
          {locale}
        </span>
        <ChevronDown className={cn("w-3.5 h-3.5 opacity-50 transition-transform duration-300", isOpen && "rotate-180")} />
      </Button>

      <LanguagePanel 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  );
}

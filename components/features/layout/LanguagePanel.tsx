'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';
import { Languages, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguagePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
];

export function LanguagePanel({ isOpen, onClose }: LanguagePanelProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
      // On desktop we might not want to close immediately, 
      // but usually for a language switcher, closing after selection is good.
      setTimeout(onClose, 500); 
    });
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 z-40 sm:hidden bg-black/20 backdrop-blur-[2px]" 
        onClick={onClose} 
      />
      
      <div 
        className={cn(
          "fixed top-16 right-3 sm:right-4 w-64 z-50",
          "animate-in fade-in slide-in-from-top-2 duration-300",
          "glass-popup" 
        )}
        style={{ 
            transform: 'translateZ(0)',
            willChange: 'transform'
        }}
      >
        <div className="flex flex-col h-full w-full rounded-lg overflow-hidden">
          
          {/* Header */}
          <div className="p-3.5 border-b border-foreground/15 flex items-center justify-between">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Languages className="w-4 h-4 text-primary" />
              Language Settings
            </h3>
            <button className="sm:hidden opacity-60 hover:opacity-100 transition p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10" onClick={onClose}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content List */}
          <div className="p-1.5 flex flex-col gap-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelectChange(lang.code)}
                disabled={isPending}
                className={cn(
                  "flex items-center justify-between p-2.5 rounded-md transition-all text-sm",
                  locale === lang.code 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-foreground/5 text-foreground/70 ring-1 ring-transparent hover:ring-foreground/5",
                  isPending && "opacity-50 cursor-wait"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg leading-none">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {locale === lang.code && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>

          {/* Footer Indicator */}
          <div className="p-2 bg-black/[0.02] dark:bg-white/[0.02] border-t border-foreground/10 text-center">
            <p className="text-[9px] text-muted-foreground/50 font-bold uppercase tracking-[0.15em]">
              {isPending ? 'Switching Language...' : 'Select Language'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

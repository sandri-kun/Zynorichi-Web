'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Palette, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

const themes = [
  { name: 'zinc', color: 'oklch(0.5 0.05 240)' },
  { name: 'rose', color: 'oklch(0.6 0.25 0)' },
  { name: 'orange', color: 'oklch(0.7 0.2 45)' },
  { name: 'emerald', color: 'oklch(0.6 0.2 150)' },
  { name: 'blue', color: 'oklch(0.6 0.2 250)' },
  { name: 'violet', color: 'oklch(0.6 0.2 300)' },
];

export function ThemeSwitcher() {
  const { theme: mode, setTheme: setMode } = useTheme(); // This one manages .dark class
  // Since we have two next-themes providers, we need to access the other one.
  // However, useTheme() only accesses the nearest provider.
  // Actually, we should have named them or used a custom context for one of them.
  
  // Wait, I used SAME NextThemesProvider in both. This will cause conflict.
  // I should use a custom context for the color theme instead of next-themes if I want both.
  // OR use a single next-themes with combined values.
  
  // Let's refine: Use ONE next-themes for Mode, and CUSTOM state for Color (stored in localStorage).
  
  const [activeColor, setActiveColor] = React.useState<string>('zinc');
  const [mounted, setMounted] = React.useState(false);
  const t = useTranslations('Themes');

  React.useEffect(() => {
    setMounted(true);
    const savedColor = localStorage.getItem('zynorichi-color-theme') || 'zinc';
    setActiveColor(savedColor);
    document.documentElement.setAttribute('data-theme', savedColor);
  }, []);

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    localStorage.setItem('zynorichi-color-theme', color);
    document.documentElement.setAttribute('data-theme', color);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Mode Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-10 h-10 border border-border/40 bg-foreground/5 hover:bg-primary/10 transition-all"
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      >
        {mode === 'dark' ? (
          <Moon className="h-5 w-5 text-primary" />
        ) : (
          <Sun className="h-5 w-5 text-primary" />
        )}
        <span className="sr-only">Toggle Mode</span>
      </Button>

      {/* Color Swatches */}
      <div className="flex gap-1.5 ml-2 p-1 bg-muted/30 rounded-full border border-border/40 backdrop-blur-md">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => handleColorChange(theme.name)}
            className={cn(
              "group relative flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 hover:scale-110",
              activeColor === theme.name ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "hover:ring-1 hover:ring-border"
            )}
            style={{ backgroundColor: theme.color }}
            title={t(theme.name)}
          >
            {activeColor === theme.name && (
              <Check className="h-3 w-3 text-white drop-shadow-md" />
            )}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-popover px-2 py-1 text-[10px] text-popover-foreground shadow-lg transition-all group-hover:scale-100 whitespace-nowrap z-50 capitalize">
              {t(theme.name)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

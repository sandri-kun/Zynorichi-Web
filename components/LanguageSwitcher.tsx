'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Select 
      value={locale} 
      onValueChange={onSelectChange}
      disabled={isPending}
    >
      <SelectTrigger 
        className={cn(
          "w-[130px] bg-transparent border-none hover:bg-accent/50 transition-all h-9 px-3 focus-visible:ring-0",
          isPending && "opacity-50 grayscale cursor-wait"
        )}
      >
        <Globe className={cn("h-4 w-4 text-muted-foreground mr-2", isPending && "animate-spin")} />
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent align="end" className="glass min-w-[8rem]">
        <SelectItem value="en">
          <span className="flex items-center gap-2">
            <span className="text-base">🇺🇸</span>
            <span>English</span>
          </span>
        </SelectItem>
        <SelectItem value="id">
          <span className="flex items-center gap-2">
            <span className="text-base">🇮🇩</span>
            <span>Indonesia</span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeColorProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="zinc"
      storageKey="zynorichi-color-theme"
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

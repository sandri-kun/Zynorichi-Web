'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Suppress React 19 "Encountered a script tag" warning in development
if (
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'development' &&
  typeof console !== 'undefined'
) {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Encountered a script tag while rendering React component')
    ) {
      return;
    }
    originalError(...args);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Synchronize the color theme (data-theme)
  React.useEffect(() => {
    const savedColor = localStorage.getItem('zynorichi-color-theme') || 'zinc';
    document.documentElement.setAttribute('data-theme', savedColor);
  }, []);

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      enableColorScheme={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

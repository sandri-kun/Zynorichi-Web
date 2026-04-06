'use client';

import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ZynoProvider, useZyno } from '@/context/ZynoContext';
import { ReadingProgressBar } from './ReadingProgressBar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayoutContent({ children }: MainLayoutProps) {
  const { isDrawerExpanded, toggleDrawer, setSearchQuery } = useZyno();

  // Keyboard Shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Drawer with 'D' (if not typing in input)
      if (e.key.toLowerCase() === 'd' && 
          document.activeElement?.tagName !== 'INPUT' && 
          document.activeElement?.tagName !== 'TEXTAREA') {
        toggleDrawer();
      }
      
      // Focus Search with 'K' + Ctrl/Cmd
      if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDrawer]);

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <ReadingProgressBar />
      
      <Header />
      
      <div className="flex flex-1 relative">
        {/* Mobile Sidebar Overlay */}
        <div 
          className={cn(
            "fixed inset-0 bg-black/60 backdrop-blur-md z-50 lg:hidden transition-all duration-500",
            isDrawerExpanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={toggleDrawer}
        />

        <Sidebar />
        
        <main className={cn(
          "flex-1 w-full transition-all duration-500 ease-in-out",
          "px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12",
          "mx-auto max-w-[1600px] min-w-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ZynoProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </ZynoProvider>
  );
}

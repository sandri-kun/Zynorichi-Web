'use client';

import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ZynoProvider, useZyno } from '@/context/ZynoContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayoutContent({ children }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { searchQuery, setSearchQuery, activeCategory } = useZyno();

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onSearch={(q) => setSearchQuery(q)} 
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen} 
      />
      <div className="flex-1 flex max-w-[1600px] mx-auto w-full px-6">
        <Sidebar className={isMenuOpen ? "flex fixed inset-y-0 left-0 z-[60] bg-background/95 backdrop-blur-xl animate-in slide-in-from-left duration-300" : "hidden lg:flex"} />
        <main className="flex-1 py-8 lg:pl-6 w-full overflow-hidden">
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

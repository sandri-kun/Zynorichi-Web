'use client';

import React, { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgressHeight = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      const scrollHeight = documentHeight - windowHeight;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgressHeight, { passive: true });
    updateProgressHeight();
    
    return () => window.removeEventListener('scroll', updateProgressHeight);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-[1.5px] bg-primary z-[100] transition-all duration-150 ease-out shadow-[0_0_8px_var(--primary)]"
      style={{ width: `${progress}%` }}
    />
  );
}

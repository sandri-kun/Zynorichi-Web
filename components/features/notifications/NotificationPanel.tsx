'use client';

import React from 'react';
import { useZyno } from '@/context/ZynoContext';
import { Bell, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { notifications, clearNotifications } = useZyno();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile to close when clicking outside */}
      <div 
        className="fixed inset-0 z-[60] sm:hidden bg-black/20 backdrop-blur-[2px]" 
        onClick={onClose} 
      />
      
      <div 
        className={cn(
          "fixed top-16 right-3 sm:right-4 w-72 sm:w-80 max-w-[calc(100%-1.5rem)] z-50",
          "animate-in fade-in slide-in-from-top-2 duration-300",
          // Kita gunakan class custom glass-popup yang sudah didefinisikan di CSS global
          "glass-popup" 
        )}
        // FORCE STYLE: Memastikan browser merender layer ini dengan benar untuk blur
        style={{ 
            transform: 'translateZ(0)',
            willChange: 'transform'
        }}
      >
        <div className="flex flex-col h-full w-full rounded-lg overflow-hidden">
          
          {/* Header: Hapus bg-transparent agar blur menyatu natural */}
          <div className="p-3.5 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button 
                  className="text-xs opacity-50 hover:opacity-100 transition font-medium px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={clearNotifications}
                >
                  Clear
                </button>
              )}
              <button className="sm:hidden opacity-60 hover:opacity-100 transition p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10" onClick={onClose}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content List */}
          <div className="max-h-80 overflow-y-auto no-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center gap-2 opacity-40">
                <Bell className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs font-medium">No new notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5 dark:divide-white/5 divide-black/5">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors group cursor-default">
                    <p className="text-xs leading-relaxed mb-1 text-foreground/90">{n.message}</p>
                    <div className="text-[10px] opacity-40 mt-0.5 font-medium flex items-center gap-1">
                       {n.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Indicator */}
          {notifications.length > 0 && (
            <div className="p-2 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/5 dark:border-white/5 text-center">
              <p className="text-[9px] text-muted-foreground/50 font-bold uppercase tracking-[0.15em]">
                Recent Activity
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
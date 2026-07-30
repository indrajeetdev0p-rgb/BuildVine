"use client";

import { useState, useEffect } from "react";
import { Bell, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getUnreadNotifications, markAsRead, markAllAsRead } from "@/lib/actions/notification";
import { useRouter } from "next/navigation";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function loadNotifications() {
      const data = await getUnreadNotifications();
      setNotifications(data);
      setUnreadCount(data.length);
    }
    loadNotifications();
    
    // Polling every 30 seconds for real-time feel
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string, link: string | null) => {
    await markAsRead(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    setUnreadCount(prev => Math.max(0, prev - 1));
    
    if (link) {
      setIsOpen(false);
      router.push(link);
    }
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    setNotifications([]);
    setUnreadCount(0);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-text-secondary hover:text-text-primary transition-colors hover:bg-bg-secondary rounded-lg"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-bg-primary" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 bg-bg-secondary border border-border-default rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-border-default flex items-center justify-between bg-bg-elevated">
                <h3 className="font-semibold text-text-primary">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllRead}
                    className="text-xs font-medium text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
                  >
                    <Check size={14} /> Mark all read
                  </button>
                )}
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-text-tertiary flex flex-col items-center">
                    <Bell size={32} className="mb-3 opacity-20" />
                    <p className="text-sm">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        onClick={() => handleMarkAsRead(notif.id, notif.link)}
                        className="p-4 border-b border-border-default/50 hover:bg-bg-hover cursor-pointer transition-colors relative group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-2 w-2 rounded-full bg-accent mt-1.5 shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-text-primary leading-tight font-medium mb-1">
                              {notif.title}
                            </p>
                            <p className="text-xs text-text-tertiary">
                              {new Date(notif.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-2 border-t border-border-default bg-bg-elevated text-center">
                <Link 
                  href="/dashboard/feed" 
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors p-2 block w-full rounded-md hover:bg-bg-hover"
                >
                  View your Following feed
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Bell, Check, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { markAsRead, markAllAsRead, clearAllNotifications } from "@/lib/actions/notification";
import { useRouter } from "next/navigation";
import { Card, Button } from "@/components/ui";
import { format } from "date-fns";

export default function NotificationsContent({ initialNotifications }: { initialNotifications: any[] }) {
  const [notifications, setNotifications] = useState<any[]>(initialNotifications);
  const router = useRouter();

  const handleMarkAsRead = async (id: string, link: string | null) => {
    // Only mark it if it's unread
    const notif = notifications.find(n => n.id === id);
    if (notif && !notif.isRead) {
      await markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    }
    
    if (link) {
      router.push(link);
    }
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAll = async () => {
    await clearAllNotifications();
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-border-default">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-text-secondary" />
          <span className="font-semibold text-text-primary">
            {unreadCount} Unread
          </span>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllRead} className="gap-2">
              <Check size={14} /> Mark all read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearAll} className="gap-2 text-danger hover:bg-danger/10 hover:border-danger hover:text-danger">
              <Trash2 size={14} /> Clear list
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border-default rounded-2xl">
          <Bell size={40} className="mx-auto mb-4 opacity-20 text-text-secondary" />
          <h3 className="text-lg font-bold text-text-primary mb-1">You're all caught up!</h3>
          <p className="text-text-secondary">You don't have any notifications right now.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          <AnimatePresence>
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <div 
                  onClick={() => handleMarkAsRead(notif.id, notif.link)}
                  className={`
                    w-full text-left flex items-start gap-4 p-5 rounded-xl border transition-all cursor-pointer group
                    ${notif.isRead ? 'bg-bg-secondary/30 border-border-default/50' : 'bg-bg-secondary border-border-default shadow-sm'}
                    hover:border-accent/50 hover:bg-bg-elevated
                  `}
                >
                  <div className="mt-1 shrink-0">
                    {notif.isRead ? (
                      <div className="h-2.5 w-2.5 rounded-full bg-border-default" />
                    ) : (
                      <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.5)]" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-base font-semibold mb-1 ${notif.isRead ? 'text-text-secondary' : 'text-text-primary'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-text-tertiary mb-3">
                      {format(new Date(notif.createdAt), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                    
                    {notif.link && (
                      <div className="inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        View details <ArrowRight size={14} />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

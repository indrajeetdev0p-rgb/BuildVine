"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function ModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.back();
    }, 300); // Wait for exit animation
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Force close the modal if the user clicks a link inside it that navigates away
  useEffect(() => {
    if (!pathname.includes("/project/")) {
      setIsOpen(false);
      document.body.style.overflow = "unset";
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="w-full max-w-6xl h-[90vh] bg-bg-primary border border-border-default rounded-[var(--radius-xl)] shadow-2xl overflow-y-auto pointer-events-auto relative"
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-bg-secondary hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors z-[110] border border-border-default"
              >
                <X size={20} />
              </button>
              
              <div className="pt-8">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

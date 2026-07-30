"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { THEMES } from "@/components/providers/ThemeProvider";

export function ThemeSwitcher({ placement = "bottom" }: { placement?: "top" | "bottom" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-32 animate-pulse rounded-[var(--radius-md)] bg-bg-tertiary" />
    );
  }

  const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-[var(--radius-md)] border border-border-default bg-bg-tertiary px-3 py-1.5 text-sm font-medium hover:bg-bg-hover transition-colors"
      >
        <span>{activeTheme.icon}</span>
        <span className="text-text-primary">{activeTheme.label}</span>
      </button>

      {isOpen && (
        <div className={`absolute ${placement === "top" ? "bottom-full mb-2" : "top-full mt-2"} right-0 w-48 rounded-[var(--radius-md)] border border-border-default bg-bg-tertiary p-1 shadow-lg z-50`}>
          {THEMES.map((t) => {
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`
                  flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-accent-muted text-accent"
                      : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                  }
                `}
              >
                <span className="text-base">{t.icon}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

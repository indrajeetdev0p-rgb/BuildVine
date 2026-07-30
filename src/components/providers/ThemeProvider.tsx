"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";

const THEMES = [
  { id: "obsidian", label: "Obsidian Glow", icon: "🔥" },
  { id: "midnight", label: "Midnight Forge", icon: "🌙" },
  { id: "cosmic", label: "Cosmic Slate", icon: "🌌" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="obsidian"
      themes={THEMES.map((t) => t.id)}
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}

export { THEMES };
export type { ThemeId };

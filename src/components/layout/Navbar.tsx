"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Menu, X } from "lucide-react";
import { Button, ThemeSwitcher } from "@/components/ui";
import { NotificationBell } from "@/components/ui/NotificationBell";

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/trending", label: "Trending" },
  { href: "/developers", label: "Developers" },
  // { href: "/pricing", label: "Pricing" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = useSession();

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundImage: "var(--accent-gradient)" }}
          >
            B
          </div>
          <span className="font-heading text-xl font-extrabold tracking-tight text-text-primary">
            Build
            <span className="gradient-text">Vine</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeSwitcher />
          {!isPending && session && <NotificationBell />}
          {!isPending && session ? (
            <Link href="/dashboard" className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-bg-elevated border border-border-default hover:border-accent hover:bg-bg-hover transition-all group" title="Go to Dashboard">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-tertiary overflow-hidden text-xs font-bold text-text-primary uppercase shrink-0">
                {((session.user as any).avatar || (session.user.image && session.user.image !== "null")) ? (
                  <img src={(session.user as any).avatar || session.user.image} alt={session.user.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                ) : (
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`} alt={session.user.name} className="h-full w-full object-cover bg-bg-tertiary" />
                )}
              </div>
              <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                {session.user.name}
              </span>
            </Link>
          ) : !isPending ? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="gradient" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : null}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-default bg-bg-secondary animate-slide-down">
          <div className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border-default flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                {!isPending && session && <NotificationBell />}
              </div>
              {!isPending && session ? (
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="gradient" size="md" className="w-full">
                    Dashboard
                  </Button>
                </Link>
              ) : !isPending ? (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="secondary" size="md" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    <Button variant="gradient" size="md" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Telescope,
  Flame,
  Users,
  Rss,
  Bell,
  Heart,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { signOut } from "@/lib/auth-client";
import { getUnreadNotifications } from "@/lib/actions/notification";
const SIDEBAR_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/feed", label: "Following Feed", icon: Rss },
  { href: "/dashboard/likes", label: "Liked Projects", icon: Heart },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

const COMMUNITY_LINKS = [
  { href: "/explore", label: "Explore Projects", icon: Telescope },
  { href: "/trending", label: "Trending Now", icon: Flame },
  { href: "/developers", label: "Meet Builders", icon: Users },
] as const;

export default function SidebarLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { name: string; email: string; id: string; avatar?: string | null; image?: string | null; username?: string | null };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await getUnreadNotifications();
        setUnreadCount(data.length);
      } catch (err) {}
    }
    loadNotifications();
    
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-border-default bg-bg-secondary">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 px-6 border-b border-border-default">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="BuildVine Logo"
              width={33}
              height={33}
              className="rounded-lg"
            />
            <span className="font-heading text-lg font-extrabold tracking-tight">
              BuildVine
            </span>
          </Link>
        </div>

        {/* Nav — scrollable */}
        <nav className="flex-1 flex flex-col gap-1 p-3 mt-2 overflow-y-auto">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center justify-between px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-all
                  ${isActive
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={isActive ? "text-accent" : "text-text-tertiary"}
                  />
                  <div className="flex items-center gap-2">
                    {link.label}
                    {link.label === "Notifications" && unreadCount > 0 && (
                      <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white shadow-sm">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </div>
                </div>
                {isActive && <ChevronRight size={16} className="text-accent" />}
              </Link>
            );
          })}

          <div className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Community
          </div>
          {COMMUNITY_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center justify-between px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-all
                  ${isActive
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={isActive ? "text-accent" : "text-text-tertiary"}
                  />
                  {link.label}
                </div>
                {isActive && <ChevronRight size={16} className="text-accent" />}
              </Link>
            );
          })}

          <div className="mt-auto pt-4 px-1">
            <Link href="/dashboard/projects/new">
              <Button
                variant="gradient"
                size="sm"
                className="w-full justify-center"
                leftIcon={<Plus size={16} />}
              >
                New Project
              </Button>
            </Link>
          </div>
        </nav>

        <div className="flex-shrink-0">
          {/* Bottom */}
          <div className="border-t border-border-default p-4 space-y-3">
            <ThemeSwitcher placement="top" />
            <div className="flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5">
              <Link href={user.username ? `/${user.username}` : "/dashboard/settings"} className="flex-1 flex items-center gap-3 min-w-0 group cursor-pointer">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated border border-border-default overflow-hidden text-xs font-bold text-text-primary uppercase shrink-0">
                  {(user.avatar || user.image) ? (
                    <img src={user.avatar || user.image!} alt="Avatar" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                  ) : (
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} className="h-full w-full object-cover bg-bg-tertiary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate group-hover:text-accent transition-colors">
                    {user.name}
                  </p>
                  <p className="text-xs text-text-tertiary truncate">
                    {user.email}
                  </p>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-text-tertiary hover:text-text-primary transition-colors cursor-pointer shrink-0"
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64 flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-border-default bg-bg-secondary sticky top-0 z-40">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="BuildVine Logo"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="font-heading text-lg font-extrabold">
              BuildVine
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-30 bg-bg-primary/95 backdrop-blur-sm pt-16 h-[100dvh] overflow-y-auto border-t border-border-default">
            <div className="p-4 flex flex-col gap-8">
              <nav className="flex flex-col gap-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2 px-3">
                  Dashboard
                </div>
                {SIDEBAR_LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                        }`}
                    >
                      <Icon size={18} className={isActive ? "text-accent" : "text-text-tertiary"} />
                      <div className="flex items-center gap-2">
                        {link.label}
                        {link.label === "Notifications" && unreadCount > 0 && (
                          <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white shadow-sm">
                            {unreadCount > 99 ? "99+" : unreadCount}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <nav className="flex flex-col gap-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2 px-3">
                  Community
                </div>
                {COMMUNITY_LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                        }`}
                    >
                      <Icon size={18} className={isActive ? "text-accent" : "text-text-tertiary"} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pb-8 pt-4 border-t border-border-default">
                <div className="flex items-center gap-3 px-3 mb-4">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-bg-tertiary border border-border-default shrink-0">
                    <img
                      src={user.avatar || user.image || `https://api.dicebear.com/9.x/notionists/svg?seed=${user.username || user.name}`}
                      alt={user.name || "User"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium text-text-primary truncate">{user.name}</span>
                    <span className="text-xs text-text-tertiary truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="ml-auto text-text-tertiary hover:text-danger transition-colors p-2"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

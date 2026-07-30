import Link from "next/link";
import { Heart } from "lucide-react";
import { GithubIcon, TwitterIcon } from "@/components/icons";

const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Explore", href: "/explore" },
      { label: "Trending", href: "/trending" },
      { label: "Developers", href: "/developers" },
      // { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "mailto:hello@buildvine.tech" },
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white"
                style={{ backgroundImage: "var(--accent-gradient)" }}
              >
                B
              </div>
              <span className="font-heading text-lg font-extrabold tracking-tight">
                BuildVine
              </span>
            </Link>
            <p className="mt-3 text-sm text-text-tertiary leading-relaxed max-w-[240px]">
              The home for every project. One link, everything inside.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-text-primary transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-text-primary transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-4">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-default py-6"
          suppressHydrationWarning
        >
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} BuildVine. All rights reserved.
          </p>

          {/* suppressHydrationWarning prevents a crash when ad-blockers strip this link */}
          <a
            href="https://www.buymeacoffee.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border-default bg-bg-elevated hover:bg-bg-hover hover:border-[#FFDD00]/40 transition-all text-xs font-semibold text-text-secondary hover:text-text-primary group"
            suppressHydrationWarning
          >
            <span className="text-base group-hover:scale-110 transition-transform">☕</span>
            Buy me a coffee
          </a>
        </div>
      </div>
    </footer>
  );
}

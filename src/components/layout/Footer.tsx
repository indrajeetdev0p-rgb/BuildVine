import Link from "next/link";
import Image from "next/image";
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
      { label: "Contact", href: "/contact" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
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
              <Image
                src="/logo.png"
                alt="BuildVine Logo"
                width={33}
                height={33}
                className="rounded-md"
              />
              <span className="font-heading text-lg font-extrabold tracking-tight">
                BuildVine
              </span>
            </Link>
            <p className="mt-3 text-sm text-text-tertiary leading-relaxed max-w-[240px]">
              The home for every project. One link, everything inside.
            </p>
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

        </div>
      </div>
    </footer>
  );
}

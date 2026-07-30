import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Sponsor } from "@/lib/sponsors";

interface SponsorCardProps {
  sponsor: Sponsor;
  variant?: "feed" | "sidebar" | "banner";
}

export function SponsorCard({ sponsor, variant = "feed" }: SponsorCardProps) {
  if (variant === "sidebar") {
    return (
      <div className="rounded-xl border border-border-default bg-bg-secondary/60 p-4 hover:border-border-subtle transition-all group">
        {/* Label */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary mb-3">
          Sponsored
        </p>

        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center text-lg border border-border-default"
            style={{ background: `${sponsor.color}15`, borderColor: `${sponsor.color}30` }}
          >
            {sponsor.icon}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary leading-tight mb-1">
              {sponsor.name}
            </p>
            <p className="text-xs text-text-tertiary leading-relaxed mb-3">
              {sponsor.tagline}
            </p>
            <Link
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity opacity-80 group-hover:opacity-100"
              style={{ color: sponsor.color === "#ffffff" ? "var(--color-accent)" : sponsor.color }}
            >
              {sponsor.cta}
              <ExternalLink size={10} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className="relative col-span-full rounded-2xl border overflow-hidden group"
        style={{ borderColor: `${sponsor.color}25` }}
      >
        {/* Subtle gradient background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at left, ${sponsor.color}, transparent 70%)` }}
        />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5">
          {/* Sponsored label */}
          <span className="absolute top-3 right-4 text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
            Sponsored
          </span>

          {/* Icon */}
          <div
            className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-xl border"
            style={{ background: `${sponsor.color}15`, borderColor: `${sponsor.color}30` }}
          >
            {sponsor.icon}
          </div>

          <div className="flex-1 min-w-0 pr-20">
            <p className="text-sm font-bold text-text-primary mb-0.5">{sponsor.name}</p>
            <p className="text-sm text-text-secondary">{sponsor.tagline}</p>
          </div>

          <Link
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `${sponsor.color}15`,
              borderColor: `${sponsor.color}40`,
              color: sponsor.color === "#ffffff" ? "var(--color-accent)" : sponsor.color,
            }}
          >
            {sponsor.cta}
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    );
  }

  // Default "feed" variant — fits in the project card grid
  return (
    <div
      className="relative rounded-2xl border overflow-hidden group cursor-default flex flex-col justify-between p-5"
      style={{ borderColor: `${sponsor.color}25`, minHeight: "220px" }}
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${sponsor.color}, transparent 70%)` }}
      />

      <div className="relative flex-1">
        {/* Label */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary mb-4">
          Sponsored
        </p>

        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center text-xl border"
            style={{ background: `${sponsor.color}15`, borderColor: `${sponsor.color}30` }}
          >
            {sponsor.icon}
          </div>
          <p className="text-base font-bold text-text-primary">{sponsor.name}</p>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">{sponsor.tagline}</p>
      </div>

      <div className="relative mt-5">
        <Link
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: `${sponsor.color}15`,
            borderColor: `${sponsor.color}40`,
            color: sponsor.color === "#ffffff" ? "var(--color-accent)" : sponsor.color,
          }}
        >
          {sponsor.cta}
          <ExternalLink size={13} />
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import type { Sponsor } from "@/lib/sponsors";

interface SponsorCardProps {
  sponsor?: Sponsor; // Kept for backwards compatibility but ignored
  variant?: "feed" | "sidebar" | "banner";
}

export function SponsorCard({ variant = "feed" }: SponsorCardProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error", err);
    }
  }, []);

  return (
    <div 
      className={`relative rounded-xl border border-border-default overflow-hidden bg-bg-secondary/20 flex flex-col justify-center items-center ${
        variant === "sidebar" ? "p-2 min-h-[120px]" : 
        variant === "banner" ? "p-4 min-h-[100px] col-span-full" : 
        "p-4 min-h-[120px]"
      }`}
    >
      {/* Subtle Label */}
      <span className="absolute top-2 left-3 text-[9px] font-semibold uppercase tracking-widest text-text-tertiary">
        Advertisement
      </span>

      {/* AdSense Unit */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%", minHeight: "100%" }}
        data-ad-client="ca-pub-YOUR_ADSENSE_ID"
        data-ad-slot="YOUR_AD_SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

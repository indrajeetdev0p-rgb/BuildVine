// ----------------------------------------------------------------
// SPONSOR / AFFILIATE CONFIGURATION
// ----------------------------------------------------------------
// Add your affiliate links here. Each entry shows as a native
// "Sponsored" card in the Explore feed and project sidebar.
// Replace the placeholder URLs with your actual referral links.
// ----------------------------------------------------------------

export interface Sponsor {
  name: string;
  tagline: string;
  url: string;
  cta: string;
  icon: string; // Emoji or short text for the icon badge
  color: string; // Accent color for the card border glow
}

export const SPONSORS: Sponsor[] = [
  {
    name: "DigitalOcean",
    tagline: "Get $200 in free credits to deploy your next project",
    url: "https://www.digitalocean.com/?refcode=YOUR_REFERRAL_CODE&utm_campaign=Referral_Invite&utm_medium=Referral_Program",
    cta: "Claim $200 Credits →",
    icon: "🌊",
    color: "#0080FF",
  },
  {
    name: "Vercel",
    tagline: "Deploy your frontend instantly with zero configuration",
    url: "https://vercel.com/?ref=buildvine",
    cta: "Deploy for Free →",
    icon: "▲",
    color: "#ffffff",
  },
  {
    name: "Turso",
    tagline: "SQLite for production — globally replicated, edge-fast",
    url: "https://turso.tech/?ref=buildvine",
    cta: "Try Turso Free →",
    icon: "🐢",
    color: "#4FF8D2",
  },
  {
    name: "Namecheap",
    tagline: "Register your dream domain starting at $1.98/year",
    url: "https://www.namecheap.com/?ref=buildvine",
    cta: "Find Your Domain →",
    icon: "🌐",
    color: "#FF5100",
  },
];

const FALLBACK_SPONSOR: Sponsor = {
  name: "Your Ad Here",
  tagline: "Reach thousands of developers building the future.",
  url: "mailto:hello@buildvine.tech?subject=Sponsorship%20Inquiry",
  cta: "Sponsor BuildVine →",
  icon: "✨",
  color: "#FFDD00",
};

/**
 * Returns a random sponsor from the list.
 * Use this to rotate sponsors across the site.
 */
export function getRandomSponsor(): Sponsor {
  if (SPONSORS.length === 0) return FALLBACK_SPONSOR;
  return SPONSORS[Math.floor(Math.random() * SPONSORS.length)];
}

/**
 * Returns sponsors for a specific page position.
 * Uses a deterministic index based on position to avoid hydration mismatches.
 */
export function getSponsorByIndex(index: number): Sponsor {
  if (SPONSORS.length === 0) return FALLBACK_SPONSOR;
  return SPONSORS[index % SPONSORS.length];
}

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

export const SPONSORS: Sponsor[] = [];

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

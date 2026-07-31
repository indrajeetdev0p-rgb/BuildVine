import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, IBM_Plex_Mono, Inter, Sora, Plus_Jakarta_Sans, Fira_Code, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

/* ----------------------------------------------------------------
   FONTS — All 3 themes' fonts loaded upfront for instant switching
   ---------------------------------------------------------------- */

// Obsidian Glow (default)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Midnight Forge
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Cosmic Slate
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

/* ----------------------------------------------------------------
   METADATA
   ---------------------------------------------------------------- */
export const metadata: Metadata = {
  title: {
    default: "BuildVine — The Home for Every Project",
    template: "%s | BuildVine",
  },
  description:
    "Create a living home for every project you build. One project, one link, everything inside. The IMDb for software projects.",
  keywords: [
    "project showcase",
    "developer portfolio",
    "build in public",
    "project management",
    "software projects",
    "indie hacker",
    "startup",
    "open source",
  ],
  openGraph: {
    title: "BuildVine — The Home for Every Project",
    description:
      "Create a living home for every project you build. One project, one link, everything inside.",
    type: "website",
    locale: "en_US",
    siteName: "BuildVine",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildVine — The Home for Every Project",
    description:
      "Create a living home for every project you build. One project, one link, everything inside.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ----------------------------------------------------------------
   ROOT LAYOUT
   ---------------------------------------------------------------- */
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const fontVars = [
    spaceGrotesk.variable,
    ibmPlexMono.variable,
    inter.variable,
    jetbrainsMono.variable,
    sora.variable,
    plusJakartaSans.variable,
    firaCode.variable,
  ].join(" ");

  return (
    <html lang="en" className={`${fontVars} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          {modal}
        </ThemeProvider>
        <Toaster position="bottom-right" theme="dark" richColors />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

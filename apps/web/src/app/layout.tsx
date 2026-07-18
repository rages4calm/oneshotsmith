import type { Metadata } from "next";
import { Jost, Alegreya, Alegreya_SC } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const alegreya = Alegreya({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-alegreya",
  display: "swap",
});

const alegreyaSC = Alegreya_SC({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-alegreya-sc",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "OneShotsmith — Complete D&D 5e One-Shot Adventures from a Seed",
  description:
    "Generate complete, table-ready D&D 5e one-shot modules in your browser: keyed dungeon maps, correct encounter math, read-aloud text, NPCs, secrets, and print-perfect output. Free, no accounts, fully shareable by seed.",
  keywords: [
    "D&D", "DnD 5e", "one-shot", "adventure generator", "dungeon map generator",
    "encounter builder", "DM tools", "tabletop RPG",
  ],
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/icon-192.png`, type: "image/png", sizes: "192x192" },
    ],
    apple: `${basePath}/icon-192.png`,
  },
  // Absolute OG URLs resolve against the production host for the cPanel build.
  metadataBase: basePath ? new URL("https://carl-prewitt.com") : undefined,
  openGraph: {
    title: "OneShotsmith — Complete D&D 5e One-Shots from a Seed",
    description:
      "Keyed blue dungeon maps, real DMG encounter math, villains, read-aloud text, and print-perfect modules — forged in your browser, shareable by seed.",
    type: "website",
    images: [{ url: `${basePath}/og.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${basePath}/og.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jost.variable} ${alegreya.variable} ${alegreyaSC.variable}`}>
      <body>{children}</body>
    </html>
  );
}

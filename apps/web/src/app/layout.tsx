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

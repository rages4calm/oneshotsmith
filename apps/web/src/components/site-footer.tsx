import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-slate-950/90 border-t border-slate-800 px-4 py-8 text-sm text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {"\u00A9"} {new Date().getFullYear()} Carl Prewitt Jr. All rights reserved.
        </div>
        <nav className="flex flex-wrap gap-4 text-xs uppercase tracking-wide">
          <Link href="/character-creator" prefetch={false} className="hover:text-purple-300 transition">
            Character Creator
          </Link>
          <Link href="/one-shot-generator" prefetch={false} className="hover:text-purple-300 transition">
            One-Shot Generator
          </Link>
          <Link href="/pregen-library" prefetch={false} className="hover:text-purple-300 transition">
            Pregen Library
          </Link>
          <Link href="/character-vault" prefetch={false} className="hover:text-purple-300 transition">
            Character Vault
          </Link>
        </nav>
      </div>
    </footer>
  );
}

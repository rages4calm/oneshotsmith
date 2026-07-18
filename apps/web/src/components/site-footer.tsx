import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="no-print mt-auto border-t border-room-edge bg-room-deep text-warm">
      <div aria-hidden="true" className="h-1 w-full bg-map-deep" />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-md">
            <p className="display-caps text-sm font-bold tracking-[0.14em]">OneShotsmith</p>
            <p className="mt-2 text-sm leading-relaxed opacity-85">
              Complete D&amp;D 5e one-shot modules — map, math, and story — generated in
              your browser from a shareable seed. No accounts. No server. Free forever.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-1.5 text-sm">
            <Link href="/one-shot-generator" prefetch={false} className="hover:underline">One-Shot Generator</Link>
            <Link href="/character-creator" prefetch={false} className="hover:underline">Character Creator</Link>
            <Link href="/pregen-library" prefetch={false} className="hover:underline">Pregen Library</Link>
            <Link href="/character-vault" prefetch={false} className="hover:underline">Character Vault</Link>
            <a
              href="https://github.com/rages4calm/oneshotsmith"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </nav>
        </div>
        <div className="mt-8 border-t border-room-edge pt-5 text-xs leading-relaxed opacity-75">
          <p>
            This work includes material from the System Reference Document 5.1 (&ldquo;SRD 5.1&rdquo;) by Wizards of
            the Coast LLC, available at{" "}
            <a href="https://www.dndbeyond.com/srd" target="_blank" rel="noopener noreferrer" className="underline">
              dndbeyond.com/srd
            </a>
            . The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License. OneShotsmith
            is an independent product and is not affiliated with Wizards of the Coast.
          </p>
          <p className="mt-2">
            Code: MIT License &middot; &copy; {new Date().getFullYear()} Carl Prewitt Jr.
          </p>
        </div>
      </div>
    </footer>
  );
}

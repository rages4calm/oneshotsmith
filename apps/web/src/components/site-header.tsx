import Link from "next/link";

const LINKS = [
  { href: "/one-shot-generator", label: "One-Shot Generator" },
  { href: "/character-creator", label: "Character Creator" },
  { href: "/pregen-library", label: "Pregens" },
  { href: "/character-vault", label: "Vault" },
];

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="no-print border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" prefetch={false} className="display-caps text-lg font-bold tracking-[0.12em] text-ink hover:text-map-deep">
          OneShotsmith
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              prefetch={false}
              aria-current={current === l.href ? "page" : undefined}
              className={`display-caps text-[0.72rem] font-medium transition-colors hover:text-map-deep ${
                current === l.href ? "text-map-deep underline decoration-2 underline-offset-4" : "text-ink-soft"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/rages4calm/oneshotsmith"
            target="_blank"
            rel="noopener noreferrer"
            className="display-caps text-[0.72rem] font-medium text-ink-soft transition-colors hover:text-map-deep"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

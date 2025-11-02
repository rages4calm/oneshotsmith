export function SiteFooter() {
  return (
    <footer className="bg-slate-950/90 border-t border-slate-800 px-4 py-6 text-center text-sm text-slate-400">
      {"\u00A9"} {new Date().getFullYear()} Carl Prewitt Jr. All rights reserved.
    </footer>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="chrome flex min-h-screen flex-col items-center justify-center bg-room px-4 text-center">
      <p className="display-caps-wide text-[0.72rem] font-semibold text-brass">Area unkeyed</p>
      <h1 className="mt-3 max-w-[26ch] font-serif text-[1.8rem] font-bold leading-snug text-warm">
        This room isn&rsquo;t on the map.
      </h1>
      <p className="mt-3 max-w-[46ch] font-serif italic text-warm-soft">
        The corridor you followed leads nowhere — the page may have moved, or the
        link was mis-copied. The entrance is back this way.
      </p>
      <Link href="/" prefetch={false} className="btn-ember mt-7 inline-block px-6 py-3 text-[0.75rem]">
        Back to the table
      </Link>
    </div>
  );
}

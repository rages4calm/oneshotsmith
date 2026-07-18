"use client";

// Route-level error boundary: if anything throws client-side, players get a
// themed recovery card instead of a broken page.

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="chrome flex min-h-screen flex-col items-center justify-center bg-room px-4 text-center">
      <p className="display-caps-wide text-[0.72rem] font-semibold text-brass">Critical miss</p>
      <h1 className="mt-3 max-w-[24ch] font-serif text-[1.8rem] font-bold leading-snug text-warm">
        Something went wrong at the table.
      </h1>
      <p className="mt-3 max-w-[46ch] font-serif italic text-warm-soft">
        Nothing is lost — your saved adventures and heroes live in this browser.
        Re-roll the page and carry on.
      </p>
      <div className="mt-7 flex gap-3">
        <button type="button" onClick={() => reset()} className="btn-ember px-6 py-3 text-[0.75rem]">
          Re-roll the page
        </button>
        <a href="/" className="btn-lantern px-6 py-3 text-[0.75rem]">
          Back to the table
        </a>
      </div>
    </div>
  );
}

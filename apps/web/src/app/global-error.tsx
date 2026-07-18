"use client";

// Last-resort boundary (replaces the root layout if IT crashes). Inline styles
// only — this must render even if the stylesheet failed to load.

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#14100c",
          color: "#f2ead9",
          fontFamily: "Georgia, serif",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <h1 style={{ fontSize: "1.6rem", maxWidth: "24ch", lineHeight: 1.3 }}>
          Something went wrong at the table.
        </h1>
        <p style={{ fontStyle: "italic", color: "#b3a68d", maxWidth: "46ch" }}>
          Your saved adventures and heroes are safe in this browser. Reload to carry on.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: "1.5rem",
            padding: "0.8rem 1.6rem",
            background: "#c73b2a",
            color: "#f2ead9",
            border: "2px solid #c73b2a",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            cursor: "pointer",
          }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}

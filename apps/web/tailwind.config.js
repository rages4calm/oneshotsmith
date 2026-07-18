/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // The room (dark chrome)
        room: "var(--room)",
        "room-deep": "var(--room-deep)",
        "room-raised": "var(--room-raised)",
        "room-edge": "var(--room-edge)",
        warm: "var(--warm)",
        "warm-soft": "var(--warm-soft)",
        brass: "var(--brass)",
        "brass-soft": "var(--brass-soft)",
        ember: "var(--ember)",
        "ember-bright": "var(--ember-bright)",
        // The paper artifacts
        paper: "var(--paper)",
        "paper-shade": "var(--paper-shade)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        rule: "var(--rule)",
        "map-blue": "var(--map-blue)",
        "map-deep": "var(--map-blue-deep)",
        "map-grid": "var(--map-grid)",
        "map-line": "var(--map-line)",
        goldenrod: "var(--goldenrod)",
        "goldenrod-shade": "var(--goldenrod-shade)",
        "gold-ink": "var(--goldenrod-ink)",
        stamp: "var(--stamp-red)",
        success: "var(--success)",

        // shadcn semantic tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-jost)", "Futura", "sans-serif"],
        serif: ["var(--font-alegreya)", "Georgia", "serif"],
        sc: ["var(--font-alegreya-sc)", "var(--font-alegreya)", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Cabinet Grotesk", "Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        "bg-base": "var(--bg-base)",
        "bg-surface": "var(--bg-surface)",
        "bg-muted": "var(--bg-muted)",
        "fg-default": "var(--fg-default)",
        "fg-dim": "var(--fg-dim)",
        "fg-dimmer": "var(--fg-dimmer)",
        "border-subtle": "var(--border-subtle)",
        accent: {
          DEFAULT: "var(--accent)",
          dim: "var(--accent-dim)",
          deep: "var(--accent-deep)",
          "on-dark": "var(--accent-on-dark)",
        },
        signal: {
          warm: "var(--signal-warm)",
          "warm-dim": "var(--signal-warm-dim)",
        },
        success: "var(--success)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--bg-base)",
        foreground: "var(--fg-default)",
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "var(--bg-muted)",
          foreground: "var(--fg-default)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "var(--bg-muted)",
          foreground: "var(--fg-dim)",
        },
        card: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--fg-default)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        flat: "var(--shadow-flat)",
        raised: "var(--shadow-raised)",
        floating: "var(--shadow-floating)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        text: "var(--text)",
        muted: "var(--muted)",
        amber: "var(--amber)",
        ember: "var(--ember)",
        sage: "var(--sage)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      boxShadow: {
        soft: "0 1px 0 rgba(255,255,255,0.04) inset, 0 18px 48px -24px rgba(0,0,0,0.7)",
        glow: "0 0 0 1px var(--ring), 0 20px 60px -20px rgba(217,98,43,0.45)",
      },
      fontSize: {
        display: ["clamp(3.2rem, 7vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        h1: ["clamp(2.2rem, 4.5vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.6rem, 3vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      keyframes: {
        "scan-sweep": {
          "0%": { transform: "translateY(-10%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(110%)", opacity: "0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "gradient-pan": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "scan-sweep": "scan-sweep 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;

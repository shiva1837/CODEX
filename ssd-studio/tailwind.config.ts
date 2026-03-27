import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#050505",
          800: "#0b0b0f",
          700: "#101018"
        },
        accent: {
          500: "#62d2ff",
          600: "#7ae0ff",
          700: "#8ff3ff"
        },
        glass: "rgba(255,255,255,0.08)"
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(98, 210, 255, 0.35)",
        "glow-rose": "0 0 25px rgba(255, 140, 191, 0.35)"
      },
      backdropBlur: {
        glass: "14px"
      },
      fontFamily: {
        display: ["var(--font-playfair)"],
        sans: ["var(--font-inter)"]
      },
      animation: {
        "float-slow": "float 12s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-6px)" },
          "50%": { transform: "translateY(8px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: 0.9 },
          "50%": { opacity: 0.4 }
        }
      }
    }
  },
  plugins: []
};

export default config;

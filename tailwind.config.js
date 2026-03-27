/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0b1220",
          soft: "#121b2d"
        },
        accent: "#7dd8ff",
        glow: "#7b9bff"
      },
      boxShadow: {
        glow: "0 0 40px rgba(125, 216, 255, 0.25)"
      },
      backgroundImage: {
        "grid-overlay":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

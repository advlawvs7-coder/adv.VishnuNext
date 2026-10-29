/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,mjs}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--theme-ink)",
        midnight: "var(--theme-dark)",
        gold: "var(--theme-accent)",
        sand: "var(--theme-surface)",
        muted: "var(--theme-ink)",
        primary: "var(--theme-primary)",
        accent: "var(--theme-accent)",
        themeTint: "var(--theme-tint)",
        themeBorder: "var(--theme-border)",
        themeSurface: "var(--theme-surface)",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      boxShadow: { editorial: "0 22px 64px rgba(11,43,40,.15)" },
    },
  },
  plugins: [],
};

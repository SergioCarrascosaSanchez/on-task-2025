import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-heading)", "PT Serif", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

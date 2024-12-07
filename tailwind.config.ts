import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
      mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      gray: {
        "50": "#f6f6f6",
        "100": "#e7e7e7",
        "200": "#d1d1d1",
        "300": "#b0b0b0",
        "400": "#888888",
        "500": "#6d6d6d",
        "600": "#5d5d5d",
        "700": "#4f4f4f",
        "800": "#454545",
        "900": "#3d3d3d",
        "950": "#171717",
      },
      error: {
        light: "#ff9494",
        DEFAULT: "#ff2323",
        dark: "#500000",
      },
    },
  },
  plugins: [],
} satisfies Config;

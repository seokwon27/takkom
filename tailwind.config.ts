import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    fontSize: {
      "heading-xxxs": ["12px", "150%"],
      "heading-xxs": ["14px", "135%"],
      "heading-xs": ["16px", "135%"],
      "heading-s": ["18px", "135%"],
      "heading-m": ["20px", "135%"],
      "heading-l": ["24px", "135%"],
      "heading-xl": ["28px", "135%"],
      "heading-xxl": ["32px", "135%"],
      "heading-xxxl": ["40px", "135%"],

      "title-xxxs": ["12px", "135%"],
      "title-xxs": ["14px", "150%"],
      "title-xs": ["16px", "135%"],
      "title-s": ["18px", "135%"],
      "title-m": ["20px", "135%"],
      "title-l": ["22px", "135%"],
      "title-xl": ["24px", "135%"],

      "label-xs": ["10px", "150%"],
      "label-s": ["12px", "150%"],
      "label-m": ["13px", "150%"],
      "label-l": ["14px", "150%"],
      "label-xl": ["16px", "150%"],
      "label-xxl": ["18px", "150%"],

      "text-xs": ["10px", "150%"],
      "text-s": ["12px", "150%"],
      "text-m": ["13px", "150%"],
      "text-l": ["14px", "150%"],
      "text-xl": ["16px", "150%"]
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          10: "#FAFAFA",
          30: "#F2F2F2",
          50: "#E3E3E3",
          100: "#D9D9D9",
          200: "#C9C9C9",
          300: "#B0B0B0",
          400: "#969696",
          500: "#7D7D7D",
          600: "#636363",
          700: "#4A4A4A",
          800: "#303030",
          900: "#171717"
        },
        primary: {
          50: "#F5F9FF",
          80: "#E5EFFF",
          100: "#C2D9FF",
          200: "#8FB9FF",
          300: "#5C99FF",
          400: "#2979FF",
          500: "#005CF5",
          600: "#0048C2",
          700: "#00358F",
          800: "#00225C",
          900: "#000F29"
        },
        negative: "#FF4737",
        notice: "#FF961E",
        positive: "#008F5D",
        informative: "#248DFF"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;

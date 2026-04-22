import typography from "@tailwindcss/typography";
import bootstrapGrid from "tailwind-bootstrap-grid";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
    "./public/partials/**/*.html",
    "./public/scripts/**/*.js",
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#ff4848",
        secondary: "#415649",
        black: "#000000",
        dark: "#060C14",
        light: "#E7E5D4",
        border: "#DCDBD0",
        borderLight: "#BFBEB5",
      },
      fontFamily: {
        primary: ["var(--font-primary)"],
        secondary: ["var(--font-secondary)"],
      },
    },
  },
  plugins: [
    typography,
    bootstrapGrid({
      gridGutters: {
        0: 0,
        1: ".5rem",
        2: "1rem",
        3: "1.5rem",
        4: "2rem",
        5: "2.75rem",
        6: "3.25rem",
      },
    }),
  ],
};

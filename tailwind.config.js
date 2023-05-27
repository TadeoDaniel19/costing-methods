/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    fontSize: {
      xxs: ".55rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".975rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    colors: {
      primary: {
        DEFAULT: "#8908F9",
        light: "#F5EBFE",
        dark: "#4D00C5",
        hover: "#39038D",
      },
      background: {
        DEFAULT: "#F7F7FC",
        secondary: "#F0FFFF",
      },
      error: {
        DEFAULT: "#FF7500",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: [],
    },
    extend: {
      borderRadius: {
        DEFAULT: "12px",
      },
    },
  },
  plugins: [],
});

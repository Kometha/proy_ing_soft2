/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        appPrimary: {
          50: "#E9F1F1",
          100: "#D3E2E3",
          200: "#A7C5C8",
          300: "#7CA8AC",
          400: "#57858A",
          500: "#3A595C",
          600: "#2F494B",
          700: "#233738",
          800: "#182426",
          900: "#0C1213",
          950: "#060909",
        },
      },
    },
  },
  plugins: [],
};

const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./public/**/*.html",
    "./src/**/*.js",
    "./src/*.jsx",
    "./src/**/*.jsx",
    "./src/**/*.njs",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontWeight: {
        "fw-logo": 250,
      },

      lineHeight: {
        "lh-logo": "16.81px",
      },
      fontFamily: {
        sans: ["Pragmatica Extended", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        yellow: "#FDC500",
        "shadow-white": "#D9D9D9",
      },
    },
  },
  plugins: [],
};

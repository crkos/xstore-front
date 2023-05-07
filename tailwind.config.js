/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navbarColor: "#CAC4CE",
        categoriesColor: "#DFDFDF",
        submitColor: "#F7ECE1",
        focusedItemColor: "#efd7ca",
        bordeColor: "#BFBFBF",
        compraBoton: "#00008D",
      },
    },
    fontFamily: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          navbarColor: '#CAC4CE'
        }
    },
    fontFamily: {
        'heebo': ['Heebo', 'sans-serif'],
    }

  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins : ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'button-Day-shadow': 'inset 0 8px 60px rgba(0, 0, 0, .1), inset 0 8px 8px rgba(0, 0, 0, .1), inset 0 -4px 4px rgba(0, 0, 0, .1)',
        'night-span-shadow' : 'inset 0 8px 60px rgba(0, 0, 0, .3), inset 8px 0 8px rgba(0, 0, 0, .3), inset 0 -4px 4px rgba(0, 0, 0, .3)',
        'day-span-shadow': '0 8px 40px rgba(0, 0, 0, 0.2)',
        'button-night-shadow' : 'inset 0 8px 60px rgba(0, 0, 0, .3), inset 8px 0 8px rgba(0, 0, 0, .3), inset 0 -4px 4px rgba(0, 0, 0, .3)'
      },
    },
  },
  plugins: [],
}
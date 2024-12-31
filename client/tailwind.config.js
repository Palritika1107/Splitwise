/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {

        sans : ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'], 
      },
      gridTemplateColumns: {

        '70/30': '70% 28%',

      },
      colors: {
        customGreen: '#E3F0AF', // Add your color here
      },
    },
  },
  plugins: [],
}
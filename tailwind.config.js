/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#191B1D',
        'dark-secondary': '#232527',
        'cta-green': '#00B06F',
        'gold-star': '#F5C147',
      },
    },
  },
  plugins: [],
};

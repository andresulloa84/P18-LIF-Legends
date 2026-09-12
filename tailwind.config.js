/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        slate: '#1e293b',
        neonGreen: '#39ff14',
        gold: '#ffd700',
        robux: '#c41e3a'
      },
      fontFamily: {
        inter: ['Inter', 'system-ui']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};

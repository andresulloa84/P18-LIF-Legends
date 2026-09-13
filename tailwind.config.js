/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        robloxNavy: '#0c101d',
        robloxDark: '#131b2e',
        robloxCard: '#1a263d',
        robloxBorder: '#283856',
        robloxBlue: '#00a2ff',
        robloxCyan: '#00f0ff',
        neonLime: '#00ff66',
        robloxGold: '#ffc700',
        robloxOrange: '#ff8800',
        robloxRed: '#ff2a55',
        robloxPurple: '#a855f7',
        robloxPink: '#ec4899',
      },
      fontFamily: {
        sans: ['Fredoka', 'Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'roblox-btn': '0 6px 0 #000000',
        'roblox-btn-sm': '0 4px 0 #000000',
        'roblox-card': '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 240, 255, 0.1)',
        'roblox-glow': '0 0 20px rgba(0, 255, 102, 0.4)',
        'gold-glow': '0 0 20px rgba(255, 199, 0, 0.5)',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
      },
      animation: {
        bounceSubtle: 'bounceSubtle 2s infinite ease-in-out',
        pulseGlow: 'pulseGlow 2.5s infinite ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

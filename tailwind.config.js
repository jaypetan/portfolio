/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          400: '#0ea5e9',
          500: '#06b6d4',
        },
      },
      backgroundColor: {
        'dark-bg': '#0f172a',
        'dark-surface': '#1e293b',
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in',
        first: 'moveHorizontal 60s linear infinite',
        second: 'moveInCircle 90s linear infinite',
        third: 'moveVertical 75s linear infinite',
        fourth: 'moveHorizontal 85s linear infinite',
        fifth: 'moveInCircle 120s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        moveHorizontal: {
          '0%': {
            transform: 'translateX(-50%) translateY(-10%) rotate(0deg)',
          },
          '50%': {
            transform: 'translateX(50%) translateY(10%) rotate(4deg)',
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-10%) rotate(0deg)',
          },
        },
        moveInCircle: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        moveVertical: {
          '0%': {
            transform: 'translateY(-50%) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(50%) rotate(-4deg)',
          },
          '100%': {
            transform: 'translateY(-50%) rotate(0deg)',
          },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070b14',
        panel: '#0d1422',
        lime: '#b7f34b',
        cyan: '#48e5ff',
      },
      fontFamily: {
        sans: ['Cairo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 34px rgba(183, 243, 75, 0.2)',
        cyan: '0 0 34px rgba(72, 229, 255, 0.18)',
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        ticker: 'ticker 32s linear infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(0.96)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
}

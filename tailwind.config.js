/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05060d',
          900: '#0a0c18',
          800: '#111426',
          700: '#1a1e36',
          600: '#262b4a',
        },
        neon: {
          cyan: '#22d3ee',
          violet: '#a855f7',
          pink: '#ec4899',
          lime: '#a3e635',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'Cairo', 'sans-serif'],
        sans: ['Inter', 'Cairo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(34,211,238,0.45), 0 0 60px rgba(34,211,238,0.15)',
        'neon-violet': '0 0 20px rgba(168,85,247,0.45), 0 0 60px rgba(168,85,247,0.15)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.25s ease-out',
      },
    },
  },
  plugins: [],
};

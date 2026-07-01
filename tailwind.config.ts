import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17212b',
        graphite: '#263544',
        steel: '#aab7c2',
        cement: '#dce3e7',
        ivory: '#f6f1e8',
        brass: '#c7783e',
        brick: '#9b4b32',
        forest: '#203141',
        borderdark: '#3a4a59',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        lift: '0 18px 50px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
};

export default config;

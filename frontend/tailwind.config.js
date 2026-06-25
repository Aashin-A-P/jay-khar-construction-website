/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17202a',
        steel: '#53616f',
        cement: '#f4f1eb',
        brass: '#b8833a',
        brick: '#9b3f2f',
        forest: '#244536',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        lift: '0 18px 50px rgba(23, 32, 42, 0.14)',
      },
    },
  },
  plugins: [],
};

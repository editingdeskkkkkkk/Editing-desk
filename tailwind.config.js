/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C96A',
          bright: '#F5D97A',
          dim: '#8A6A1A',
        },
        ink: {
          DEFAULT: '#080808',
          1: '#0F0F0F',
          2: '#141414',
          3: '#1A1A1A',
          4: '#222222',
          5: '#2E2E2E',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}

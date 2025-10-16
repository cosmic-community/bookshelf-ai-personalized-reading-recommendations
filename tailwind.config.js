/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#805AD5',
          light: '#9F7AEA',
          dark: '#6B46C1',
        },
        secondary: {
          DEFAULT: '#4299E1',
          light: '#63B3ED',
          dark: '#3182CE',
        },
        accent: {
          DEFAULT: '#D53F8C',
          light: '#ED64A6',
          dark: '#B83280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
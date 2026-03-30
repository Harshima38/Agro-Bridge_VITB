/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': {
          DEFAULT: '#2D6A4F',
          light: '#40916C', // Success color
        },
        'wheat': {
          DEFAULT: '#D4A373',
        },
        'terracotta': {
          DEFAULT: '#E76F51',
          light: '#E63946', // Error color
        },
        'cream': {
          DEFAULT: '#FEFAE0',
          dark: '#F5EED0'
        },
        'text-primary': '#1B1B1B',
        'text-secondary': '#6B705C',
        'warning': '#E9C46A'
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

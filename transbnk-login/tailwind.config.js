/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#6ED1A6', dark: '#4BB686' },
      },
      boxShadow: { soft: '0 10px 25px rgba(0,0,0,0.12)' },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

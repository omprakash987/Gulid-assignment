/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue-1': '#001f3f',
        'dark-blue-2': '#003366',
        'dark-blue-3': '#00509e',
    },
    backgroundImage: {
        'dark-bluish-gradient': 'linear-gradient(to right, #001f3f, #003366, #00509e)',
    },
    },
  },
  plugins: [],
}


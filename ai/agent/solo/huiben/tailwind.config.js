/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FEF7F0',
        'light-yellow': '#FFF8DC',
        'sky-blue': '#87CEEB',
        'soft-pink': '#FFE4E1',
        'warm-white': '#FAFAFA'
      },
      fontFamily: {
        'sans': ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
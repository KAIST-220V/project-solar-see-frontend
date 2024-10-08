/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // src 폴더 내의 모든 JS, JSX, TS, TSX 파일을 감시
  ],
  theme: {
    extend: {
      colors: {
        'yellow': "#FFCD00",
        'blue': "#364F85"
      }
    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
};

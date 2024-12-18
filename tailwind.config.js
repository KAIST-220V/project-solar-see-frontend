/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // src 폴더 내의 모든 JS, JSX, TS, TSX 파일을 감시
  ],
  theme: {
    extend: {
      animation: {
        slide: "slide 1.5s ease-in-out infinite",
      },
      keyframes: {
        slide: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-10px)" },
        },
      },
      colors: {
        blue: "#364F85",
        yellow: "#FFCD00",
        orange: "#FFA629",
      },
      boxShadow: {
        custom:
          "2px 2px 6px rgba(0, 0, 0, 0.1), -1px -1px 1px rgba(0, 0, 0, 0.05)", // 커스텀 그림자
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      handwriting: ["Comic Sans MS", "cursive"],
      nanum: ["Nanum Barun Gothic", "sans-serif"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

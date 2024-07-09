/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bgimg: "url('./assets/homebg.jpeg')",
        wbgimg: "url('./src/assets/earth.png')",
      },
    },
  },
  plugins: [],
};

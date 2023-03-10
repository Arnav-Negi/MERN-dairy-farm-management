/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

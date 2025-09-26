/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [], // 👈 add this line
  theme: {
    extend: {},
  },
  plugins: [],
};

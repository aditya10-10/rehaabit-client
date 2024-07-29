/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow": "0px 3px 36px 0px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        amaranth: ["Amaranth", "sans-serif"],
      },
    },
  },
  plugins: [],
};

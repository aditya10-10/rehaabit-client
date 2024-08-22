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
        lato: ["Lato", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(127.68deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 41.5%)",
      },
    },

    screens: {
      xs: "430px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};

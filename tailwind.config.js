/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        scrollbars: {},
        width: {
          half: "48%",
          aFull: "98%"
        }
      },
      screens: {
        largeMax: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        midMax: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        smallMax: { max: "639px" }
        // => @media (max-width: 639px) { ... }
      }
    }
  },
  plugins: []
};

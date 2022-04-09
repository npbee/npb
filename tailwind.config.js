const colors = require("tailwindcss/colors");

// tailwind.config.js
module.exports = {
  purge: {
    content: ["./src/site/**/*.njk", ".eleventy.js"],
    safelistPatterns: [/h1/, /post/, /pre/, /code/, /language/],
  },
  variants: {
    extend: {
      textColor: ["active"],
    },
  },
  theme: {
    extend: {
      colors: {
        primary: colors.pink,
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "700px",
      // => @media (min-width: 768px) { ... }
    },
  },
};

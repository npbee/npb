const colors = require("tailwindcss/colors");

// tailwind.config.js
module.exports = {
  content: ["./src/site/**/*.njk", ".eleventy.js"],
  theme: {
    extend: {
      colors: {
        primary: colors.pink,
      },
    },
  },
};

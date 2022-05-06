const { gray, grayDark, pink, pinkDark } = require("@radix-ui/colors");

function toTailwindColors(radixColors) {
  let obj = {};

  Object.values(radixColors).forEach((color, idx) => {
    obj[idx + 1] = color;
  });

  return obj;
}

module.exports = {
  content: ["./src/**/*.astro"],
  theme: {
    colors: {
      white: "#ffffff",
      gray: toTailwindColors(gray),
      accent: toTailwindColors(pink),
      "gray-dark": toTailwindColors(grayDark),
      "accent-dark": toTailwindColors(pinkDark),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

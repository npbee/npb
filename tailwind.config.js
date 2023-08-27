const {
  gray,
  grayDark,
  pink,
  pinkDark,
  violet,
  violetDark,
  orange,
  orangeDark,
} = require("@radix-ui/colors");

function toTailwindColors(radixColors) {
  let obj = {};

  Object.values(radixColors).forEach((color, idx) => {
    obj[idx + 1] = color;
  });

  return obj;
}

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.astro", "./src/**/*.md"],
  theme: {
    colors: {
      white: "#ffffff",
      gray: toTailwindColors(gray),
      accent: toTailwindColors(orange),
      "gray-dark": toTailwindColors(grayDark),
      "accent-dark": toTailwindColors(orangeDark),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

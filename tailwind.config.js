const {
  gray,
  grayDark,
  pink,
  pinkDark,
  violet,
  violetDark,
  orange,
  orangeDark,
  green,
  greenDark,
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
  content: [
    "./src/**/*.astro",
    "./src/**/*.md",
    "./src/**/*.mdx",
    "./src/**/*.svelte",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        gray: toTailwindColors(gray),
        accent: toTailwindColors(orange),
        green: toTailwindColors(green),
        greenDark: toTailwindColors(greenDark),
        "gray-dark": toTailwindColors(grayDark),
        "accent-dark": toTailwindColors(orangeDark),
      },
      typography: () => ({
        gray: {
          css: {
            "--tw-prose-body": gray.gray12,
            "--tw-prose-headings": gray.gray12,
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

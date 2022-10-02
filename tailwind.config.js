const { gray, grayDark, pink, pinkDark } = require("@radix-ui/colors");

function toTailwindColors(radixColors) {
  let obj = {};

  Object.values(radixColors).forEach((color, idx) => {
    obj[idx + 1] = color;
  });

  return obj;
}

module.exports = {
  content: ["./src/**/*.astro", "./src/**/*.md"],
  theme: {
    colors: {
      white: "#ffffff",
      gray: toTailwindColors(gray),
      accent: toTailwindColors(pink),
      "gray-dark": toTailwindColors(grayDark),
      "accent-dark": toTailwindColors(pinkDark),
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            display: 'grid',
            gridTemplateColumns: "1fr min(65ch, 100%) 1fr",
            marginInline: 'auto',
            "& > *": {
              gridColumn: '2'
            }
          }
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};

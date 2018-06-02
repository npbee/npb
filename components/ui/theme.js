import facepaint from "facepaint";

const theme = {
  breakpoints: ["40em", "60em"],
  scale: [0, 0.25, 0.5, 1, 2, 4, 8, 16],
  typeScale: [3, 2.25, 1.5, 1.25, 1, 0.875, 0.75],
  unit: "rem",
  colors: {
    grey: "#eeeeee",
    greyDark: "#d9d9d9",
    muted: "#777777",
    primary: "#ca3939",
  },
  radii: [0, 3, 5],
  lineHeights: {
    body: 1.5,
  },
};

const toUnit = val => `${val}${theme.unit}`;

export const space = val => (theme.scale[val] ? toUnit(theme.scale[val]) : val);
export const fontSize = val =>
  theme.typeScale[val] ? toUnit(theme.typeScale[val]) : val;

export const get = (path, fallback) =>
  path.split(".").reduce((a, b) => (a && a[b] ? a[b] : null), theme) ||
  fallback;

export const mq = facepaint(
  theme.breakpoints.map(n => `@media screen and (min-width: ${n})`)
);

export default theme;

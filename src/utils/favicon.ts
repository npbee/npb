// The logomark: an `n` laid out as three notes on a piano roll, the low
// voice's stem in vermilion, the high voice's arch and fall in ochre.
import sharp from "sharp";

// Mirrors design/tokens.css; an icon file can't read custom properties
const tokens = {
  light: {
    ground: [0.968, 0.003, 250],
    accent: [0.63, 0.2, 33],
    accent2: [0.74, 0.14, 78],
  },
  dark: {
    ground: [0.17, 0.006, 260],
    accent: [0.7, 0.17, 35],
    accent2: [0.8, 0.13, 80],
  },
} as const;

type Theme = keyof typeof tokens;

// sRGB hex, since the PNG rasterizer doesn't read oklch
const hex = ([L, C, h]: readonly number[]) => {
  const a = C * Math.cos((h * Math.PI) / 180);
  const b = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return (
    "#" +
    rgb
      .map((v) => {
        const c = Math.min(1, Math.max(0, v));
        const e = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
        return Math.round(e * 255)
          .toString(16)
          .padStart(2, "0");
      })
      .join("")
  );
};

const style = (theme: Theme) => {
  const { ground, accent, accent2 } = tokens[theme];
  return `.g{fill:${hex(ground)}}.a{fill:${hex(accent)}}.b{fill:${hex(accent2)}}`;
};

// Notes sit on a 4-unit grid of the 32-unit square, so each cell is 2px in
// a 16px tab and the 2-unit gaps between notes stay a whole pixel
const note = (cls: string, x: number, y: number, w: number, h: number) =>
  `<rect class="${cls}" x="${x * 4}" y="${y * 4}" width="${w * 4}" height="${h * 4}" rx="1"/>`;

/**
 * The icon as SVG. `theme` fixes the inks (for PNGs); left out, the icon
 * follows the system's color scheme.
 */
export const markSvg = (theme?: Theme) => {
  const css = theme
    ? style(theme)
    : style("light") + `@media (prefers-color-scheme:dark){${style("dark")}}`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><style>${css}</style>` +
    `<rect class="g" width="32" height="32"/>` +
    note("a", 1, 1, 2, 6) +
    note("b", 3.5, 1, 3.5, 2) +
    note("b", 5, 3.5, 2, 3.5) +
    `</svg>`
  );
};

export const markPng = (size: number) =>
  sharp(Buffer.from(markSvg("light")), { density: (72 * size) / 32 })
    .resize(size, size)
    .png()
    .toBuffer();

/** An .ico of PNGs, which every browser that asks for one can read */
export const markIco = async (sizes: number[]) => {
  const pngs = await Promise.all(sizes.map(markPng));
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach((png, i) => {
    const at = 6 + 16 * i;
    header.writeUInt8(sizes[i] % 256, at);
    header.writeUInt8(sizes[i] % 256, at + 1);
    header.writeUInt16LE(1, at + 4);
    header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(png.length, at + 8);
    header.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...pngs]);
};

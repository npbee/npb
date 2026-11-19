// The social image, set like a page of the site: the wordmark, a Newsreader
// title over a mono description, date and read time in the margin, a
// waveform, and the home page's mark as ridges along the bottom edge. Light
// theme only; previews have no dark mode.
import fs from "fs/promises";
import { createRequire } from "module";
import { createCanvas } from "@napi-rs/canvas";
import satori from "satori";
import sharp from "sharp";
import { duration, peaks } from "./waveform";
import { fullDate } from "./dates";
import likes from "../data/home-mark-likes.json";
import { defaults, render, type Config } from "./home-mark";

export const prerender = true;

// design/tokens.css, light
const GROUND = "#f3f5f6";
const INK = "#13161c";
const MUTED = "#5f646b";
const RULE = "#dbdee1";
// --accent and --accent-2, in sRGB: the canvas doesn't parse oklch
const ACCENT = "#e94a2b";
const ACCENT_2 = "#db9e2e";

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 72;
const WAVE_HEIGHT = 48;
const RIDGES_HEIGHT = 150;
// The ridges liked in the lab, drawn bolder than on the page so they hold
// up at feed size
const RIDGES: Config = {
  ...defaults,
  ...(likes.find((l) => l.config.mode === "ridges")?.config as Partial<Config>),
  mode: "ridges",
  ridgeAmp: 0.35,
  opacity: 0.85,
};
const WAVE_STEP = 6;

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) =>
  fs.readFile(require.resolve(`@fontsource/${pkg}/files/${file}`));

type Node = {
  type: string;
  props: { style?: Record<string, unknown>; children?: unknown };
};

const el = (
  type: string,
  style: Record<string, unknown>,
  children?: unknown,
): Node => ({ type, props: { style, children } });

export async function generateOgImage(props: {
  title: string;
  description: string;
  date?: Date;
  /** Read time in seconds; with `longest`, sets how much of the waveform is drawn */
  seconds?: number;
  longest?: number;
  /** Seeds the waveform, so a post's image matches its progress strip */
  seed: number;
}) {
  const { title, description, date, seconds, longest, seed } = props;
  const [mono400, mono500, serif500] = await Promise.all([
    font("ibm-plex-mono", "ibm-plex-mono-latin-400-normal.woff"),
    font("ibm-plex-mono", "ibm-plex-mono-latin-500-normal.woff"),
    font("newsreader", "newsreader-latin-500-normal.woff"),
  ]);

  const margin =
    date && seconds !== undefined
      ? el(
          "div",
          {
            display: "flex",
            flexDirection: "column",
            width: 220,
            paddingTop: 14,
            fontFamily: "Plex Mono",
            fontSize: 22,
            lineHeight: 1.6,
            color: MUTED,
          },
          [
            el("span", { color: INK }, fullDate(date)),
            el("span", {}, duration(seconds)),
          ],
        )
      : null;

  const svg = await satori(
    el(
      "div",
      {
        width: WIDTH,
        height: HEIGHT - RIDGES_HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 28,
        padding: `${PAD}px ${PAD}px 24px`,
      },
      [
        // The home image's title is the name already
        date
          ? el(
              "span",
              {
                fontFamily: "Plex Mono",
                fontWeight: 500,
                fontSize: 22,
                color: INK,
              },
              "nick ball",
            )
          : null,
        el("div", { display: "flex", justifyContent: "space-between", gap: 56 }, [
          el("div", { display: "flex", flexDirection: "column", flex: 1, gap: 20 }, [
            el(
              "h1",
              {
                margin: 0,
                fontFamily: "Newsreader",
                fontWeight: 500,
                fontSize: 64,
                lineHeight: 1.12,
                letterSpacing: "-0.015em",
                color: INK,
              },
              title,
            ),
            el(
              "p",
              {
                margin: 0,
                fontFamily: "Plex Mono",
                fontSize: 24,
                lineHeight: 1.5,
                color: MUTED,
              },
              description,
            ),
          ]),
          margin,
        ]),
        waveform(seed, seconds && longest ? seconds / longest : 1),
      ],
    ) as Parameters<typeof satori>[0],
    {
      width: WIDTH,
      height: HEIGHT - RIDGES_HEIGHT,
      fonts: [
        { name: "Plex Mono", data: mono400, weight: 400, style: "normal" },
        { name: "Plex Mono", data: mono500, weight: 500, style: "normal" },
        { name: "Newsreader", data: serif500, weight: 500, style: "normal" },
      ],
    },
  );

  return sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 4, background: GROUND },
  })
    .composite([
      { input: Buffer.from(svg), top: 0, left: 0 },
      { input: ridges(seed), top: HEIGHT - RIDGES_HEIGHT, left: 0, blend: "multiply" },
    ])
    .png()
    .toBuffer();
}

/** The home page's mark, its ridges on the post's seed, so each post keeps
    its own shape */
function ridges(seed: number) {
  const canvas = createCanvas(WIDTH, RIDGES_HEIGHT);
  const g = canvas.getContext("2d");
  g.globalAlpha = RIDGES.opacity;
  const layer = createCanvas(WIDTH, RIDGES_HEIGHT);
  render(
    layer.getContext("2d") as unknown as CanvasRenderingContext2D,
    WIDTH,
    RIDGES_HEIGHT,
    { ...RIDGES, seed },
    { ink: INK, low: ACCENT, high: ACCENT_2, dark: false },
  );
  g.drawImage(layer, 0, 0);
  return canvas.toBuffer("image/png");
}

/** Ink bars for `fraction` of the width, then a flat track: a post's share
    of the longest read, as on the posts index */
function waveform(seed: number, fraction: number) {
  const width = WIDTH - PAD * 2;
  const total = Math.floor(width / WAVE_STEP);
  const drawn = Math.max(3, Math.round(total * fraction));
  const values = peaks(drawn, seed);

  return el(
    "div",
    {
      display: "flex",
      alignItems: "center",
      height: WAVE_HEIGHT,
      width,
    },
    [
      ...values.map((v) =>
        el("div", {
          width: WAVE_STEP * 0.45,
          height: Math.max(2, v * WAVE_HEIGHT),
          marginRight: WAVE_STEP * 0.55,
          backgroundColor: INK,
        }),
      ),
      el("div", { flex: 1, height: 2, backgroundColor: RULE }),
    ],
  );
}

// The social image, set like a page of the site: the wordmark, a Newsreader
// title over a mono description, date and read time in the margin, and a
// waveform along the bottom. Light theme only; previews have no dark mode.
import fs from "fs/promises";
import { createRequire } from "module";
import satori from "satori";
import sharp from "sharp";
import { duration, peaks } from "./waveform";
import { fullDate } from "./dates";

export const prerender = true;

// design/tokens.css, light
const GROUND = "#f4f4f2";
const INK = "#1a1a19";
const MUTED = "#67675f";
const RULE = "#e0e0dc";

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 72;
const WAVE_HEIGHT = 72;
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
        height: HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: PAD,
        backgroundColor: GROUND,
      },
      [
        el(
          "span",
          {
            fontFamily: "Plex Mono",
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: "0.07em",
            color: INK,
          },
          "nick ball",
        ),
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
      height: HEIGHT,
      fonts: [
        { name: "Plex Mono", data: mono400, weight: 400, style: "normal" },
        { name: "Plex Mono", data: mono500, weight: 500, style: "normal" },
        { name: "Newsreader", data: serif500, weight: 500, style: "normal" },
      ],
    },
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
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

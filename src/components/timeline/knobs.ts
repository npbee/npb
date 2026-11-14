// The lab's panel: every taste decision in the timeline, with tested bounds.
// Randomizing draws each knob from its range with a seeded PRNG, so a seed
// names a variation.
import type { Mode, TimelineConfig } from "./render";

type Key = Exclude<keyof TimelineConfig, "seed" | "mode">;

export type Knob =
  | { key: Key; type: "range"; min: number; max: number; step: number; modes?: Mode[] }
  | { key: Key; type: "select"; options: (string | number)[]; modes?: Mode[] }
  | { key: Key; type: "toggle"; modes?: Mode[] };

export const MODES: Mode[] = ["lanes", "grid", "dimensions", "ruler", "screen"];

export const knobs: { folder: string; items: Knob[] }[] = [
  {
    folder: "content",
    items: [
      { key: "group", type: "select", options: ["role", "company"] },
      { key: "label", type: "select", options: ["company+title", "company", "title"] },
      { key: "labelTone", type: "select", options: ["all-ink", "current-ink"] },
      { key: "showDuration", type: "toggle" },
      { key: "durationFormat", type: "select", options: ["ym", "decimal", "months"] },
      { key: "showEvents", type: "toggle" },
      { key: "eventStyle", type: "select", options: ["dashed", "solid"] },
      { key: "showPosts", type: "toggle" },
      { key: "nowStyle", type: "select", options: ["line", "light", "both"] },
    ],
  },
  {
    folder: "layout",
    items: [
      { key: "order", type: "select", options: ["oldest-top", "newest-top"] },
      { key: "packing", type: "select", options: ["stair", "packed"] },
      { key: "fontSize", type: "range", min: 11, max: 14, step: 0.5 },
      { key: "laneH", type: "range", min: 1, max: 14, step: 1 },
      { key: "rowGap", type: "range", min: 2, max: 28, step: 1 },
      { key: "labelGap", type: "range", min: 1, max: 12, step: 1 },
      { key: "padStart", type: "range", min: 0, max: 12, step: 1 },
      { key: "padEnd", type: "range", min: 0, max: 12, step: 1 },
    ],
  },
  {
    folder: "marks",
    items: [
      { key: "barStyle", type: "select", options: ["bar", "outline", "line"], modes: ["lanes", "screen"] },
      { key: "endTicks", type: "toggle", modes: ["lanes", "screen"] },
      { key: "unit", type: "select", options: [1, 3, 6, 12], modes: ["grid"] },
      { key: "cellShape", type: "select", options: ["square", "dot"], modes: ["grid"] },
      { key: "cellGap", type: "range", min: 0, max: 4, step: 0.5, modes: ["grid"] },
      { key: "showUnlit", type: "toggle", modes: ["grid"] },
      { key: "terminator", type: "select", options: ["tick", "slash", "arrow", "dot"], modes: ["dimensions"] },
      { key: "extLines", type: "select", options: ["dashed", "solid", "none"], modes: ["dimensions"] },
    ],
  },
  {
    folder: "screen",
    items: [
      { key: "palette", type: "select", options: ["by-company", "current", "mono"], modes: ["screen"] },
      { key: "trackBg", type: "select", options: ["line", "lane", "none"], modes: ["screen"] },
      { key: "levelH", type: "range", min: 0, max: 60, step: 2, modes: ["screen"] },
      { key: "levelStyle", type: "select", options: ["step", "linear"], modes: ["screen"] },
      { key: "levelColor", type: "select", options: ["green", "ink", "blue"], modes: ["screen"] },
      { key: "showHeader", type: "toggle", modes: ["screen"] },
      { key: "flags", type: "toggle", modes: ["screen"] },
      { key: "screenPad", type: "range", min: 8, max: 28, step: 1, modes: ["screen"] },
    ],
  },
  {
    folder: "axis",
    items: [
      { key: "tickMonths", type: "select", options: [1, 3, 6, 12] },
      { key: "minorTickH", type: "range", min: 0, max: 8, step: 1 },
      { key: "yearTickH", type: "range", min: 3, max: 14, step: 1 },
      { key: "yearLabels", type: "select", options: ["full", "short", "none"] },
      { key: "yearLabelEvery", type: "select", options: [1, 2] },
    ],
  },
];

// mulberry32
export function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Layout and mark knobs are drawn from the seed; content choices stay put,
// since they're about what to say rather than how it looks
const FIXED: Key[] = ["group", "label", "showEvents", "showPosts", "showDuration", "durationFormat", "labelTone", "showHeader"];

export function randomize(base: TimelineConfig, seed: number): TimelineConfig {
  const rand = prng(seed);
  const next = { ...base, seed } as Record<string, unknown>;
  for (const { items } of knobs)
    for (const k of items) {
      if (FIXED.includes(k.key)) continue;
      if (k.type === "range") {
        const steps = Math.round((k.max - k.min) / k.step);
        next[k.key] = k.min + Math.floor(rand() * (steps + 1)) * k.step;
      } else if (k.type === "select") {
        next[k.key] = k.options[Math.floor(rand() * k.options.length)];
      } else next[k.key] = rand() < 0.5;
    }
  return next as unknown as TimelineConfig;
}

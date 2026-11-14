// The home page mark: a track drawn in two overprinted inks. Rendering is a
// pure function of the config (seed included) and a time for drift, so a
// saved config reproduces its image exactly. Tuned in the lab
// (pages/lab/home-mark); the home page draws a variation of the likes saved
// there (data/home-mark-likes.json) on every load.

export type Mode = "groove" | "bands" | "ridges" | "roll";
export type InkLayer = "none" | "low" | "high";

export interface Config {
  mode: Mode;
  seed: number;
  // Placement: in its own slot, or a layer behind the page
  overlap: boolean;
  height: number;
  layerTop: number;
  layerHeight: number;
  opacity: number;
  // Shared
  count: number;
  weight: number;
  registration: number;
  rotate: number;
  inkLayer: InkLayer;
  swap: boolean;
  drift: number;
  // Groove
  grooveX: number;
  grooveY: number;
  grooveRadius: number;
  grooveDepth: number;
  grooveTurns: number;
  grooveSpacing: number;
  grooveSpiral: number;
  grooveStart: number;
  grooveSweep: number;
  // Bands
  bandBaseline: number;
  bandBelow: number;
  bandStart: number;
  bandLength: number;
  bandHighWidth: number;
  // Ridges
  ridgeRows: number;
  ridgeGap: number;
  ridgeShear: number;
  ridgeAmp: number;
  ridgeAlpha: number;
  // Roll
  rollRows: number;
  rollNote: number;
  rollLength: number;
  rollThreshold: number;
  rollTop: number;
  rollSpan: number;
}

export const defaults: Config = {
  mode: "groove",
  seed: 7,
  overlap: false,
  height: 260,
  layerTop: -160,
  layerHeight: 640,
  opacity: 1,
  count: 200,
  weight: 2.5,
  registration: 1.5,
  rotate: 0,
  inkLayer: "none",
  swap: false,
  drift: 0.2,
  grooveX: 0.1,
  grooveY: 0.55,
  grooveRadius: 0.38,
  grooveDepth: 0.25,
  grooveTurns: 4,
  grooveSpacing: 0.07,
  grooveSpiral: 0,
  grooveStart: -100,
  grooveSweep: 320,
  bandBaseline: 0.62,
  bandBelow: 0.25,
  bandStart: 0,
  bandLength: 1,
  bandHighWidth: 0.45,
  ridgeRows: 6,
  ridgeGap: 0.12,
  ridgeShear: 0.03,
  ridgeAmp: 0.3,
  ridgeAlpha: 0.85,
  rollRows: 18,
  rollNote: 6,
  rollLength: 1,
  rollThreshold: 0.35,
  rollTop: 0.1,
  rollSpan: 0.8,
};

export type Knob = {
  key: keyof Config;
  label: string;
  min: number;
  max: number;
  step: number;
};

export const placement: Knob[] = [
  { key: "height", label: "slot height", min: 0, max: 480, step: 10 },
  { key: "layerTop", label: "layer top", min: -400, max: 200, step: 10 },
  { key: "layerHeight", label: "layer height", min: 200, max: 1400, step: 10 },
  { key: "opacity", label: "opacity", min: 0.15, max: 1, step: 0.05 },
];

export const knobs: Record<"shared" | Mode, Knob[]> = {
  shared: [
    { key: "count", label: "marks", min: 24, max: 400, step: 1 },
    { key: "weight", label: "weight", min: 0.5, max: 8, step: 0.25 },
    { key: "registration", label: "misregister", min: 0, max: 6, step: 0.25 },
    { key: "rotate", label: "rotate °", min: -45, max: 45, step: 0.5 },
    { key: "drift", label: "drift", min: 0, max: 1, step: 0.05 },
  ],
  groove: [
    { key: "grooveX", label: "center x", min: -0.6, max: 1.6, step: 0.01 },
    { key: "grooveY", label: "center y", min: -1, max: 2, step: 0.01 },
    { key: "grooveRadius", label: "radius", min: 0.1, max: 2, step: 0.01 },
    { key: "grooveDepth", label: "depth", min: 0.02, max: 0.6, step: 0.01 },
    { key: "grooveTurns", label: "turns", min: 1, max: 10, step: 1 },
    { key: "grooveSpacing", label: "spacing", min: 0.01, max: 0.3, step: 0.005 },
    { key: "grooveSpiral", label: "spiral", min: 0, max: 1, step: 0.05 },
    { key: "grooveStart", label: "start °", min: -180, max: 180, step: 1 },
    { key: "grooveSweep", label: "sweep °", min: 30, max: 360, step: 1 },
  ],
  bands: [
    { key: "bandBaseline", label: "baseline", min: 0.1, max: 0.9, step: 0.01 },
    { key: "bandBelow", label: "below line", min: 0, max: 1, step: 0.01 },
    { key: "bandStart", label: "start", min: -0.3, max: 0.6, step: 0.01 },
    { key: "bandLength", label: "length", min: 0.2, max: 1.6, step: 0.01 },
    { key: "bandHighWidth", label: "high width", min: 0.1, max: 1, step: 0.01 },
  ],
  ridges: [
    { key: "ridgeRows", label: "rows", min: 2, max: 20, step: 1 },
    { key: "ridgeGap", label: "row gap", min: 0.02, max: 0.25, step: 0.005 },
    { key: "ridgeShear", label: "lean", min: -0.2, max: 0.2, step: 0.005 },
    { key: "ridgeAmp", label: "amplitude", min: 0.05, max: 0.8, step: 0.01 },
    { key: "ridgeAlpha", label: "ink density", min: 0.2, max: 1, step: 0.05 },
  ],
  roll: [
    { key: "rollRows", label: "pitches", min: 4, max: 40, step: 1 },
    { key: "rollNote", label: "note height", min: 1, max: 16, step: 0.5 },
    { key: "rollLength", label: "note length", min: 0.2, max: 4, step: 0.05 },
    { key: "rollThreshold", label: "threshold", min: 0.05, max: 0.9, step: 0.01 },
    { key: "rollTop", label: "top", min: -0.2, max: 0.8, step: 0.01 },
    { key: "rollSpan", label: "range", min: 0.1, max: 1.2, step: 0.01 },
  ],
};

export interface Inks {
  ink: string;
  low: string;
  high: string;
  dark: boolean;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A track's shape, generated until a real one is analysed: sections of
    differing energy, a low voice on a slow pulse and a high voice on a
    faster, looser one that enters later. Both 0–1. */
export function track(seed: number, n = 512) {
  const rand = mulberry32(seed * 9973 + 1);
  const sections: { end: number; energy: number; hi: number }[] = [];
  let at = 0;
  while (at < 1) {
    at = Math.min(1, at + 0.08 + rand() * 0.22);
    sections.push({ end: at, energy: 0.25 + rand() * 0.75, hi: rand() });
  }
  const pulse = 8 + Math.floor(rand() * 8);
  const fast = pulse * (2 + Math.floor(rand() * 2));
  const low = new Float32Array(n);
  const high = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const s = sections.find((x) => t <= x.end) ?? sections[sections.length - 1];
    const fade = Math.min(1, t * 12, (1 - t) * 10);
    const beat = (t * pulse * 8) % 1;
    const tick = (t * fast * 8) % 1;
    low[i] = s.energy * fade * (0.35 + 0.65 * Math.exp(-beat * 5)) * (0.8 + rand() * 0.2);
    high[i] =
      s.energy * s.hi * fade * (t > 0.12 ? 1 : t / 0.12) *
      (0.35 + 0.65 * Math.exp(-tick * 6)) * (0.6 + rand() * 0.4);
  }
  const norm = (a: Float32Array) => {
    const m = Math.max(...a) || 1;
    return a.map((v) => v / m);
  };
  return { low: norm(low), high: norm(high) };
}

const sample = (a: Float32Array, t: number) =>
  a[Math.min(a.length - 1, Math.max(0, Math.floor(t * a.length)))];

/** Where the mouse is over the canvas, in canvas pixels, and how present
    it is (0–1, eased in and out) */
export type Pointer = { x: number; y: number; amount: number };

/** How strongly the pointer reaches a mark: full at the pointer, nothing
    past the radius, softening toward the edge. `at` measures from the
    pointer itself; `span` from its vertical line to the nearest point of a
    horizontal span, as a playhead would. */
type Lens = {
  at: (x: number, y: number) => number;
  span: (x0: number, x1: number) => number;
  y: number;
};
const LENS_RADIUS = 150;
const falloff = (d: number, amount: number) => (d >= 1 ? 0 : amount * (1 - d) ** 2);
const noLens: Lens = { at: () => 0, span: () => 0, y: 0 };
const lensAt = (p: Pointer): Lens => ({
  at: (x, y) => falloff(Math.hypot(x - p.x, y - p.y) / LENS_RADIUS, p.amount),
  span: (x0, x1) =>
    falloff(Math.max(0, x0 - p.x, p.x - x1) / (LENS_RADIUS * 0.4), p.amount),
  y: p.y,
});

type Layer = { data: Float32Array; voice: 0 | 1 };
type Draw = (
  g: CanvasRenderingContext2D,
  w: number,
  h: number,
  c: Config,
  l: Layer,
  phase: number,
  lens: Lens,
) => void;
const rad = (d: number) => (d * Math.PI) / 180;

export function render(
  g: CanvasRenderingContext2D,
  w: number,
  h: number,
  c: Config,
  inks: Inks,
  time = 0,
  pointer?: Pointer,
) {
  const { low, high } = track(c.seed);
  g.save();
  g.clearRect(0, 0, w, h);
  // Overprint: inks darken where they cross on light, brighten on dark
  g.globalCompositeOperation = inks.dark ? "screen" : "multiply";
  // Rotation turns the whole print about its center, off the page's axis
  g.translate(w / 2, h / 2);
  g.rotate(rad(c.rotate));
  g.translate(-w / 2, -h / 2);

  const lowInk = c.inkLayer === "low" ? inks.ink : c.swap ? inks.high : inks.low;
  const highInk = c.inkLayer === "high" ? inks.ink : c.swap ? inks.low : inks.high;
  const phase = time * c.drift;
  const draw: Draw = { groove, bands, ridges, roll }[c.mode];
  // The pointer, taken back through the rotation into drawing space
  let lens = noLens;
  if (pointer && pointer.amount > 0.001) {
    const a = -rad(c.rotate);
    const dx = pointer.x - w / 2;
    const dy = pointer.y - h / 2;
    lens = lensAt({
      x: w / 2 + dx * Math.cos(a) - dy * Math.sin(a),
      y: h / 2 + dx * Math.sin(a) + dy * Math.cos(a),
      amount: pointer.amount,
    });
  }

  for (const layer of [
    { data: low, ink: lowInk, voice: 0 as const },
    { data: high, ink: highInk, voice: 1 as const },
  ]) {
    g.save();
    // The second pass lands a little off the first
    if (layer.voice === 1) g.translate(c.registration, c.registration * 0.6);
    g.fillStyle = layer.ink;
    g.strokeStyle = layer.ink;
    g.lineWidth = c.weight;
    g.lineCap = "butt";
    draw(g, w, h, c, layer, phase, lens);
    g.restore();
  }
  g.restore();
}

/** The track wrapped round a center like a record's groove, several turns
    inward, as rings or one continuous spiral. Low marks fall inside the
    groove line, high marks rise outside it. */
const groove: Draw = (g, w, h, c, l, phase, lens) => {
  const cx = c.grooveX * w;
  const cy = c.grooveY * h;
  const size = Math.min(w, h * 2.5);
  const total = c.count * c.grooveTurns;
  for (let i = 0; i < total; i++) {
    const t = i / total;
    const turn = Math.floor(i / c.count);
    const within = (i % c.count) / c.count;
    const v = sample(l.data, t);
    if (v < 0.03) continue;
    const r = (c.grooveRadius - (turn + c.grooveSpiral * within) * c.grooveSpacing) * size;
    if (r <= 0) continue;
    const a0 = rad(c.grooveStart + c.grooveSweep * within) + phase * 0.1;
    // A hand on the record: grooves near the pointer drag round with it,
    // like a scratch, and their marks lean along the turn
    const pull = lens.at(cx + Math.cos(a0) * r, cy + Math.sin(a0) * r);
    const a = a0 + (pull * 30) / Math.max(r, 30);
    const tilt = pull * 0.5;
    const depth = c.grooveDepth * size * c.grooveSpacing * 4 * v;
    const ra = l.voice ? r : r - depth;
    const rb = l.voice ? r + depth : r;
    g.beginPath();
    g.moveTo(cx + Math.cos(a) * ra, cy + Math.sin(a) * ra);
    g.lineTo(cx + Math.cos(a + (tilt * depth) / rb) * rb, cy + Math.sin(a + (tilt * depth) / rb) * rb);
    g.stroke();
  }
};

/** Bars along time from an off-center baseline: the low voice wide, the
    high voice narrower and half a step over, each reaching further above
    the line than below it. */
const bands: Draw = (g, w, h, c, l, phase, lens) => {
  const x0 = c.bandStart * w;
  const span = c.bandLength * w;
  const pitch = span / c.count;
  const base = c.bandBaseline * h;
  const down = (h - base) * c.bandBelow;
  const barW = Math.max(0.5, pitch * 0.55 * (l.voice ? c.bandHighWidth : 1));
  const shift = (phase * 0.03) % 1;
  for (let i = 0; i < c.count; i++) {
    const t = (i / c.count + shift) % 1;
    const v = sample(l.data, t);
    const x = x0 + i * pitch + (pitch - barW) / 2 + (l.voice ? pitch / 2 : 0);
    // A meter catching a peak: bars under the pointer jump up
    const bend = 1 + 0.9 * lens.at(x, base - v * base * 0.5);
    const top = Math.min(base, v * base * 0.95 * bend);
    g.fillRect(x, base - top, barW, top + v * down * bend + 0.5);
  }
};

/** Stretches of the track stacked as rows, each leaning further over,
    filled flat; the voices take alternate rows. */
const ridges: Draw = (g, w, h, c, l, phase, lens) => {
  const rows = c.ridgeRows;
  const amp = c.ridgeAmp * h;
  const gap = c.ridgeGap * h;
  const top = h - (rows - 1) * gap - 4;
  const shift = (phase * 0.02) % 1;
  g.globalAlpha = c.ridgeAlpha;
  for (let r = 0; r < rows; r++) {
    if (r % 2 !== l.voice) continue;
    const rowBase = top + r * gap;
    const lean = c.ridgeShear * w * (r - rows / 2);
    // Wind through the rows: they part around the pointer, those above it
    // pushed up and those below pushed down
    const away = Math.sign(rowBase - lens.y) || 1;
    const part = (x: number) => away * lens.at(x, rowBase) * gap * 0.9;
    g.beginPath();
    g.moveTo(lean, rowBase + part(lean));
    for (let i = 0; i <= c.count; i++) {
      const u = i / c.count;
      const v = sample(l.data, ((r + u) / rows + shift) % 1);
      const x = lean + u * w;
      // Taper at the ends so each row rises from and settles to its line
      g.lineTo(x, rowBase + part(x) - v * amp * Math.sin(Math.PI * u) ** 0.6);
    }
    for (let i = c.count; i >= 0; i--) {
      const x = lean + (i / c.count) * w;
      g.lineTo(x, rowBase + part(x));
    }
    g.closePath();
    g.fill();
  }
};

/** A piano roll, or a graphic score: each beat that peaks past the
    threshold starts a note, held for as long as the phrase around it is
    loud. Low notes take the lower pitches, high notes the upper ones; each
    melody steps rather than jumps. */
const roll: Draw = (g, w, h, c, l, phase, lens) => {
  const rand = mulberry32(c.seed * 31 + l.voice * 7 + 3);
  const rows = c.rollRows;
  const top = c.rollTop * h;
  const rowH = (c.rollSpan * h) / rows;
  const half = Math.floor(rows / 2);
  const lo = l.voice ? 0 : half;
  const hi = l.voice ? half : rows;
  let pitch = lo + Math.floor(rand() * (hi - lo));
  const shift = (phase * 0.02) % 1;
  const steps = c.count;
  const at = (k: number) => sample(l.data, k / steps);
  // Smoothed, so a note's length follows the phrase rather than one beat
  const level = (k: number) => {
    let sum = 0;
    for (let d = -3; d <= 3; d++) sum += at(k + d);
    return sum / 7;
  };
  for (let i = 0; i < steps; i++) {
    const v = at(i);
    if (v < c.rollThreshold || v < at(i - 1) || v <= at(i + 1)) continue;
    const len = Math.max(1, Math.round(level(i) * 6 * c.rollLength));
    pitch = Math.min(hi - 1, Math.max(lo, pitch + Math.round((rand() - 0.5) * 4)));
    const x = ((i / steps + shift) % 1) * w;
    const y = top + pitch * rowH + (rowH - c.rollNote) / 2;
    const width = (len / steps) * w;
    // The pointer is a playhead: notes it passes over sound, swelling
    // about their line while they play
    const tall = c.rollNote * (1 + 1.4 * lens.span(x, x + width));
    g.fillRect(x, y + (c.rollNote - tall) / 2, width, tall);
  }
};

/** How each mode sits on the page. Free marks lie behind the header and
    intro, thin or sparse enough to read through; strips are bolder, so
    they keep to the space between the header and the intro. */
export const placementOf = (mode: Mode) =>
  mode === "bands" || mode === "ridges" ? "strip" : "free";

/** How far a variation may wander from the likes, per mode, where few
    likes leave little to blend between. Integers stay integers. */
const wander: Record<Mode, [keyof Config, number][]> = {
  groove: [
    ["grooveX", 0.05],
    ["grooveY", 0.1],
    ["grooveTurns", 2],
    ["rotate", 8],
  ],
  bands: [
    ["count", 15],
    ["bandBaseline", 0.06],
    ["bandBelow", 0.1],
    ["bandStart", 0.08],
  ],
  ridges: [
    ["count", 15],
    ["ridgeRows", 1],
    ["ridgeShear", 0.04],
    ["ridgeAmp", 0.04],
  ],
  roll: [
    ["count", 25],
    ["rollRows", 4],
    ["rollNote", 1.5],
    ["rollThreshold", 0.1],
    ["rollTop", 0.08],
    ["rollSpan", 0.1],
  ],
};

const integers = new Set<keyof Config>(["count", "grooveTurns", "ridgeRows", "rollRows"]);

/** A new variation from the likes: one like, blended toward another of the
    same mode by a random amount, then nudged within its mode's wander, on a
    fresh seed. Every value stays between settings already liked, give or
    take the wander, and inside the knob's range. */
export function vary(likes: { config: Partial<Config> }[], random = Math.random) {
  const pick = <T>(xs: T[]) => xs[Math.floor(random() * xs.length)];
  const a = { ...defaults, ...pick(likes).config } as Config;
  const b = {
    ...defaults,
    ...pick(likes.filter((l) => l.config.mode === a.mode)).config,
  } as Config;
  const t = random();
  const out: Record<string, unknown> = { ...a };
  for (const key of Object.keys(a) as (keyof Config)[]) {
    const va = a[key];
    const vb = b[key];
    if (key === "seed") continue;
    if (typeof va === "number" && typeof vb === "number") out[key] = va + (vb - va) * t;
    else if (va !== vb) out[key] = random() < 0.5 ? va : vb;
  }
  const ranges = new Map(
    [...placement, ...knobs.shared, ...knobs[a.mode]].map((k) => [k.key, k]),
  );
  for (const [key, amount] of wander[a.mode]) {
    out[key] = (out[key] as number) + (random() * 2 - 1) * amount;
  }
  for (const [key, value] of Object.entries(out)) {
    if (typeof value !== "number") continue;
    const k = ranges.get(key as keyof Config);
    let v = k ? Math.min(k.max, Math.max(k.min, value)) : value;
    v = integers.has(key as keyof Config) ? Math.round(v) : +v.toFixed(3);
    out[key] = v;
  }
  out.seed = Math.floor(random() * 1e6);
  return { config: out as unknown as Config, from: [a, b], t };
}

/** Follows the mouse over a canvas, easing in when it arrives and out when
    it leaves. Mouse only, since touch has no hover; call step() each frame
    for the current pointer, or undefined when there's none. */
export function trackPointer(canvas: HTMLCanvasElement) {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return () => undefined;
  let client: { x: number; y: number } | null = null;
  const cur: Pointer = { x: 0, y: 0, amount: 0 };
  let placed = false;
  addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse") client = { x: e.clientX, y: e.clientY };
  });
  document.documentElement.addEventListener("pointerleave", () => (client = null));
  return (): Pointer | undefined => {
    let target = 0;
    if (client) {
      const r = canvas.getBoundingClientRect();
      const x = client.x - r.left;
      const y = client.y - r.top;
      target = x >= 0 && y >= 0 && x <= r.width && y <= r.height ? 1 : 0;
      if (!placed) {
        cur.x = x;
        cur.y = y;
        placed = true;
      }
      cur.x += (x - cur.x) * 0.18;
      cur.y += (y - cur.y) * 0.18;
    }
    cur.amount += (target - cur.amount) * 0.08;
    if (cur.amount < 0.001 && !target) {
      cur.amount = 0;
      return undefined;
    }
    return { ...cur };
  };
}

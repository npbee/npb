// Career timeline as an SVG string, drawn for the desktop sheet; phones get
// the text view instead. A pure function of (input, config): the
// same pair always draws the same picture, so a saved config reproduces it.
// Colors are token classes, so one render serves both themes.

export type Mode = "lanes" | "grid" | "dimensions" | "ruler" | "screen";

export interface Role {
  company: string;
  title: string;
  start: string; // yyyy-mm
  end: string | null; // null: current
  // Seniority for the screen's level line; read from the title when absent
  level?: number;
}

export interface Career {
  roles: Role[];
  events: { label: string; date: string }[];
}

export interface TimelineInput {
  career: Career;
  posts: string[]; // yyyy-mm
  now: string; // yyyy-mm-dd
}

export interface TimelineConfig {
  seed: number;
  mode: Mode;
  group: "role" | "company";
  order: "oldest-top" | "newest-top";
  packing: "stair" | "packed";
  label: "company" | "company+title" | "title";
  labelTone: "all-ink" | "current-ink";
  showDuration: boolean;
  durationFormat: "ym" | "decimal" | "months";
  fontSize: number;
  laneH: number;
  rowGap: number;
  labelGap: number;
  barStyle: "bar" | "outline" | "line";
  endTicks: boolean;
  unit: number;
  cellShape: "square" | "dot";
  cellGap: number;
  showUnlit: boolean;
  terminator: "tick" | "slash" | "arrow" | "dot";
  extLines: "none" | "solid" | "dashed";
  tickMonths: number;
  minorTickH: number;
  yearTickH: number;
  yearLabels: "full" | "short" | "none";
  yearLabelEvery: number;
  nowStyle: "line" | "light" | "both";
  showEvents: boolean;
  eventStyle: "dashed" | "solid";
  showPosts: boolean;
  padStart: number;
  padEnd: number;
  // Screen mode
  palette: "mono" | "by-company" | "current";
  trackBg: "none" | "line" | "lane";
  levelH: number;
  levelStyle: "step" | "linear";
  levelColor: "green" | "ink" | "blue";
  showHeader: boolean;
  flags: boolean;
  screenPad: number;
}

export const defaultConfig: TimelineConfig = {
  seed: 1,
  mode: "lanes",
  group: "role",
  order: "oldest-top",
  packing: "stair",
  label: "company+title",
  labelTone: "all-ink",
  showDuration: false,
  durationFormat: "ym",
  fontSize: 12,
  laneH: 6,
  rowGap: 10,
  labelGap: 4,
  barStyle: "bar",
  endTicks: true,
  unit: 3,
  cellShape: "square",
  cellGap: 1,
  showUnlit: true,
  terminator: "tick",
  extLines: "dashed",
  tickMonths: 3,
  minorTickH: 3,
  yearTickH: 7,
  yearLabels: "full",
  yearLabelEvery: 1,
  nowStyle: "line",
  showEvents: true,
  eventStyle: "dashed",
  showPosts: false,
  padStart: 2,
  padEnd: 2,
  palette: "by-company",
  trackBg: "line",
  levelH: 28,
  levelStyle: "step",
  levelColor: "green",
  showHeader: true,
  flags: true,
  screenPad: 14,
};

export const WIDTH = 640;

const LABEL = 11; // --text-label
const MONO_ADVANCE = 0.6; // IBM Plex Mono: 600 of 1000 units

interface Item {
  company: string;
  title: string;
  start: number;
  end: number;
  months: number;
  current: boolean;
  splits: number[];
  level: number;
}

// Absolute months; fractional for a day within a month
const month = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return y * 12 + (m - 1) + (d ? (d - 1) / 30 : 0);
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

const r = (n: number) => Math.round(n * 100) / 100;

function items(input: TimelineInput, c: TimelineConfig): Item[] {
  const now = month(input.now);
  const nowMonth = Math.floor(now);
  const roles: Item[] = input.career.roles.map((role) => {
    const start = month(role.start);
    const end = role.end ? month(role.end) : now;
    // Inclusive months, the way a résumé counts them
    const months = (role.end ? month(role.end) : nowMonth) - start + 1;
    return {
      company: role.company,
      title: role.title,
      start,
      end,
      months,
      current: role.end === null,
      splits: [],
      level:
        role.level ??
        (/staff|principal|lead/.test(role.title) ? 3 : /senior/.test(role.title) ? 2 : 1),
    };
  });

  if (c.group === "role") return roles;

  const merged: Item[] = [];
  for (const role of roles) {
    const last = merged.at(-1);
    if (last && last.company === role.company) {
      last.splits.push(role.start);
      last.end = role.end;
      last.title = role.title;
      last.current = role.current;
      last.level = role.level;
      last.months = Math.floor(role.end) - last.start + 1;
    } else {
      merged.push({ ...role, splits: [] });
    }
  }
  return merged;
}

export function duration(months: number, format: TimelineConfig["durationFormat"]) {
  if (format === "months") return `${months} mo`;
  if (format === "decimal") return `${(months / 12).toFixed(1)} yrs`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y}y`, m && `${m}m`].filter(Boolean).join(" ") || "0m";
}

interface Label {
  parts: { text: string; cls: string; bold?: boolean }[];
  chars: number;
}

function label(item: Item, c: TimelineConfig, withDuration: boolean): Label {
  const tone = c.labelTone === "all-ink" || item.current ? "ink" : "muted";
  const parts: Label["parts"] = [];
  if (c.label !== "title") parts.push({ text: item.company, cls: tone, bold: true });
  if (c.label !== "company") {
    if (parts.length) parts.push({ text: " · ", cls: "muted" });
    parts.push({ text: item.title, cls: "muted" });
  }
  if (withDuration) {
    parts.push({ text: "  " + duration(item.months, c.durationFormat), cls: "muted" });
  }
  return { parts, chars: parts.reduce((n, p) => n + p.text.length, 0) };
}

function text(l: Label, x: number, y: number, fs: number, anchor = "start") {
  const spans = l.parts
    .map(
      (p) =>
        `<tspan class="tl-${p.cls}"${p.bold ? ' font-weight="700"' : ""}>${esc(p.text)}</tspan>`,
    )
    .join("");
  return `<text x="${r(x)}" y="${r(y)}" font-size="${fs}" text-anchor="${anchor}" xml:space="preserve">${spans}</text>`;
}

function smallLabel(s: string, x: number, y: number, cls: string, anchor = "start") {
  return `<text x="${r(x)}" y="${r(y)}" font-size="${LABEL}" letter-spacing="0.16em" text-anchor="${anchor}" class="tl-${cls}">${esc(s.toUpperCase())}</text>`;
}

const labelWidth = (chars: number, fs: number) => chars * fs * MONO_ADVANCE;
const smallWidth = (s: string) => s.length * LABEL * (MONO_ADVANCE + 0.16);

// Greedy rows: each entry takes the first row where it fits after a gap
function pack(spans: [number, number][], gap: number) {
  const ends: number[] = [];
  return spans.map(([a, b]) => {
    let row = ends.findIndex((e) => a >= e + gap);
    if (row === -1) row = ends.push(-Infinity) - 1;
    ends[row] = b;
    return row;
  });
}

const STYLE = `<style>
.tl-ink{fill:var(--ink)} .tl-muted{fill:var(--muted)} .tl-rule{fill:var(--rule)}
.tl-accent{fill:var(--accent-ink)} .tl-ground{fill:var(--paper)}
.tl-blue{fill:var(--display-blue)} .tl-green{fill:var(--display-green)} .tl-red{fill:var(--display-red)}
.tl-s-blue{stroke:var(--display-blue)} .tl-s-green{stroke:var(--display-green)} .tl-s-red{stroke:var(--display-red)}
text{font-family:var(--font-mono);font-variant-numeric:tabular-nums}
.tl-s-ink{stroke:var(--ink)} .tl-s-muted{stroke:var(--muted)} .tl-s-rule{stroke:var(--rule)}
.tl-s-accent{stroke:var(--accent)}
line,path,polyline{fill:none;stroke-width:1}
</style>`;

function line(x1: number, y1: number, x2: number, y2: number, cls: string, extra = "") {
  return `<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}" class="tl-s-${cls}"${extra}/>`;
}

function rect(x: number, y: number, w: number, h: number, cls: string) {
  return `<rect x="${r(x)}" y="${r(y)}" width="${r(Math.max(w, 0.5))}" height="${r(Math.max(h, 0.5))}" class="tl-${cls}"/>`;
}

// One end mark of a dimension line. `dir` points away from the span.
function terminator(
  kind: TimelineConfig["terminator"],
  x: number,
  y: number,
  size: number,
  dir: 1 | -1,
) {
  const h = size / 2;
  const pt = (a: number, b: number) => `${r(x + a)},${r(y + b)}`;
  const ln = (a1: number, b1: number, a2: number, b2: number) => line(x + a1, y + b1, x + a2, y + b2, "ink");
  switch (kind) {
    case "tick":
      return ln(0, -h, 0, h);
    case "slash":
      return ln(-h * 0.7, h, h * 0.7, -h);
    case "dot":
      return `<circle cx="${r(x)}" cy="${r(y)}" r="${r(Math.max(size / 3, 1))}" class="tl-ink"/>`;
    case "arrow":
      return `<polygon points="${pt(0, 0)} ${pt(-dir * size, -h * 0.6)} ${pt(-dir * size, h * 0.6)}" class="tl-ink"/>`;
  }
}

const svg = (W: number, H: number, body: string, extraStyle = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">${STYLE.replace("</style>", extraStyle + "</style>")}${body}</svg>`;

// Width is in px at true size: drawn for the space it fills, never scaled
export function render(input: TimelineInput, c: TimelineConfig, width = WIDTH) {
  if (c.mode === "screen") return screen(input, c, width);
  const { body, H } = horizontal(input, c, width, false);
  return svg(width, H, body);
}

// Screen colors: the page tokens are pointed at the display's, so the same
// drawing code lights up on black in both themes
const SCREEN_VARS =
  "--paper:var(--display);--ink:var(--display-ink);--muted:var(--display-muted);--rule:var(--display-dim);--accent:var(--display-red);--accent-ink:var(--display-red)";

function screen(input: TimelineInput, c: TimelineConfig, W: number) {
  const pad = c.screenPad;
  const inner = W - pad * 2;
  const { body, H } = horizontal(input, c, inner, true);
  const out: string[] = [];
  let headerH = 0;
  if (c.showHeader) {
    const list = items(input, { ...c, group: "role" });
    const current = list.find((i) => i.current) ?? list.at(-1)!;
    const first = Math.min(...list.map((i) => i.start));
    const years = Math.floor((month(input.now) - first) / 12);
    const nowLabel = input.now.slice(0, 7).replace("-", ".");
    const read = (lab: string, val: string, cls: string, x: number, anchor: string) =>
      `<text x="${r(x)}" y="${pad + LABEL}" font-size="${LABEL}" letter-spacing="0.16em" text-anchor="${anchor}" class="tl-${cls}">${esc(lab.toUpperCase())}</text>` +
      `<text x="${r(x)}" y="${pad + LABEL + 15}" font-size="12" text-anchor="${anchor}" class="tl-ink">${esc(val)}</text>`;
    out.push(read("role", current.title, "blue", pad, "start"));
    out.push(read("span", `${years} years`, "green", W / 2, "middle"));
    out.push(read("now", nowLabel, "red", W - pad, "end"));
    headerH = LABEL + 15 + 12;
  }
  const total = H + pad * 2 + headerH;
  return svg(
    W,
    Math.ceil(total),
    `<g style="${SCREEN_VARS}"><rect width="${W}" height="${r(total)}" rx="6" class="tl-ground"/>${out.join("")}<g transform="translate(${pad} ${r(pad + headerH)})">${body}</g></g>`,
  );
}

function range(input: TimelineInput, list: Item[], c: TimelineConfig) {
  const first = Math.min(...list.map((i) => i.start));
  const now = month(input.now);
  return { startM: Math.floor(first) - c.padStart, endM: now + c.padEnd, now };
}

function horizontal(input: TimelineInput, c: TimelineConfig, W: number, onScreen: boolean) {
  const fs = c.fontSize;
  const mode = c.mode === "screen" ? "lanes" : c.mode;
  let list = items(input, c).toSorted((a, b) => a.start - b.start);
  const { startM, endM, now } = range(input, list, c);
  const x = (m: number) => ((m - startM) / (endM - startM)) * W;
  const out: string[] = [];

  const inLabelDur = c.showDuration && mode !== "dimensions";
  // A label too wide for the drawing sheds its duration, then its title
  const labels = list.map((i) => {
    const dur = inLabelDur || mode === "dimensions";
    const tries: [TimelineConfig["label"], boolean][] = [[c.label, dur], [c.label, false], [c.label === "title" ? "title" : "company", false]];
    for (const [lab, d] of tries) {
      const l = label(i, { ...c, label: lab }, d);
      if (labelWidth(l.chars, fs) <= W) return l;
    }
    return label(i, { ...c, label: "company" }, false);
  });
  const dimLabels = mode === "dimensions";

  // Where each label sits, and the span each row entry occupies
  const placed = list.map((item, i) => {
    const w = labelWidth(labels[i].chars, fs);
    const x1 = x(item.start);
    const x2 = x(item.end);
    let lx = clamp(mode === "ruler" ? x1 + 4 : x1, 0, W - w);
    if (dimLabels && w < x2 - x1) lx = (x1 + x2) / 2 - w / 2;
    return { item, x1, x2, w, lx, occupy: [Math.min(lx, x1), Math.max(lx + w, x2)] as [number, number] };
  });

  let rows: number[];
  if (c.packing === "packed") rows = pack(placed.map((p) => p.occupy), 10);
  else rows = placed.map((_, i) => i);
  const rowCount = Math.max(...rows) + 1;
  if (c.order === "newest-top") rows = rows.map((row) => rowCount - 1 - row);

  // Markers row: now and events, packed into as many label rows as needed
  const markers: { m: number; text: string; cls: string; anchor: "start" | "end" }[] = [];
  // On the screen the header's readout already names now
  if (c.nowStyle !== "light" && !(onScreen && c.showHeader))
    markers.push({ m: now, text: "now", cls: "accent", anchor: "end" });
  if (c.showEvents)
    for (const e of input.career.events)
      markers.push({ m: month(e.date), text: e.label, cls: "muted", anchor: "start" });
  const mSpans = markers.map((mk) => {
    const w = smallWidth(mk.text);
    const a = mk.anchor === "end" ? x(mk.m) - 4 - w : x(mk.m) + 4;
    return [clamp(a, 0, W - w), clamp(a, 0, W - w) + w] as [number, number];
  });
  const mRows = pack(mSpans, 8);
  const markerRowH = LABEL * 1.5;
  const markersH = markers.length ? (Math.max(...mRows) + 1) * markerRowH + 4 : 0;
  markers.forEach((mk, i) => {
    const y = mRows[i] * markerRowH + LABEL;
    out.push(smallLabel(mk.text, mSpans[i][0], y, mk.cls));
  });

  // Screen: a level line above the tracks, rising with seniority
  const levelH = onScreen ? c.levelH : 0;
  if (levelH > 0) {
    const roles = items(input, { ...c, group: "role" });
    const maxL = Math.max(2, ...roles.map((i) => i.level));
    const ly = (l: number) => markersH + 4 + levelH - ((l - 1) / (maxL - 1)) * levelH;
    const pts: [number, number][] = [];
    roles.forEach((role, k) => {
      const px = x(role.start);
      if (c.levelStyle === "step" && k > 0) pts.push([px, ly(roles[k - 1].level)]);
      pts.push([px, ly(role.level)]);
    });
    pts.push([x(now), ly(roles.at(-1)!.level)]);
    out.push(`<polyline points="${pts.map(([a, b]) => `${r(a)},${r(b)}`).join(" ")}" class="tl-s-${c.levelColor}"/>`);
    roles.forEach((role) => {
      const cx = r(x(role.start));
      const cy = r(ly(role.level));
      out.push(
        role.current
          ? `<circle cx="${cx}" cy="${cy}" r="3.5" class="tl-${c.levelColor}"/>`
          : `<circle cx="${cx}" cy="${cy}" r="3" class="tl-ground tl-s-${c.levelColor}" stroke-width="1.5"/>`,
      );
    });
  }

  const labelH = fs * 1.3;
  const rowH = mode === "ruler" ? labelH : labelH + c.labelGap + c.laneH;
  const top = markersH + 2 + (levelH > 0 ? levelH + 14 : 0);
  const rowTop = (row: number) => top + row * (rowH + c.rowGap);
  const rowsBottom = mode === "ruler" ? top + rowCount * (rowH + c.rowGap) : rowTop(rowCount) - c.rowGap;
  const band = mode === "ruler" ? c.laneH : 0;
  const axisY = rowsBottom + c.rowGap + band;

  // Grid mode draws every cell of the row, lit where a role covers it
  if (mode === "grid") {
    const unitPx = x(startM + c.unit) - x(startM);
    const cw = Math.max(unitPx - c.cellGap, 1);
    const first = Math.ceil(startM / c.unit) * c.unit;
    for (let row = 0; row < rowCount; row++) {
      const y = rowTop(row) + labelH + c.labelGap;
      const covering = placed.filter((_, i) => rows[i] === row).map((p) => p.item);
      for (let m = first; m + c.unit <= endM + 0.001; m += c.unit) {
        const lit = covering.some((it) => m + c.unit / 2 >= it.start && m + c.unit / 2 < it.end);
        if (!lit && !c.showUnlit) continue;
        const cls = lit ? "ink" : "rule";
        const cx = x(m) + c.cellGap / 2;
        if (c.cellShape === "dot") {
          const rad = Math.min(cw, c.laneH) / 2;
          out.push(`<circle cx="${r(cx + cw / 2)}" cy="${r(y + c.laneH / 2)}" r="${r(rad)}" class="tl-${cls}"/>`);
        } else out.push(rect(cx, y, cw, c.laneH, cls));
      }
    }
  }

  // Screen palettes; red stays free for now unless a company claims it
  const companies = [...new Set(list.map((i) => i.company))];
  const hue = (item: Item) => {
    if (!onScreen || c.palette === "mono") return "ink";
    if (c.palette === "current") return item.current ? "blue" : "ink";
    return ["blue", "green", "ink", "red"][companies.indexOf(item.company) % 4];
  };

  placed.forEach((p, i) => {
    const row = rows[i];
    const y0 = rowTop(row);
    const by = y0 + labelH + c.labelGap;
    const mid = by + c.laneH / 2;
    out.push(text(labels[i], p.lx, y0 + fs, fs));
    if (onScreen && c.trackBg === "line") out.push(line(0, mid, W, mid, "rule"));
    if (onScreen && c.trackBg === "lane") out.push(rect(0, by, W, c.laneH, "rule"));
    const ink = hue(p.item);

    if (mode === "lanes") {
      if (c.barStyle === "bar") {
        const cuts = [p.x1, ...p.item.splits.map(x), p.x2];
        for (let k = 0; k < cuts.length - 1; k++)
          out.push(rect(cuts[k] + (k ? 1 : 0), by, cuts[k + 1] - cuts[k] - (k ? 1 : 0), c.laneH, ink));
      } else if (c.barStyle === "outline") {
        out.push(`<rect x="${r(p.x1 + 0.5)}" y="${r(by + 0.5)}" width="${r(p.x2 - p.x1 - 1)}" height="${r(c.laneH - 1)}" class="tl-s-${ink}" fill="none"/>`);
        for (const s of p.item.splits) out.push(line(x(s), by, x(s), by + c.laneH, ink));
      } else {
        out.push(line(p.x1, mid, p.x2, mid, ink));
        if (c.endTicks) {
          out.push(line(p.x1, by, p.x1, by + c.laneH, ink));
          if (!p.item.current) out.push(line(p.x2, by, p.x2, by + c.laneH, ink));
        }
        for (const s of p.item.splits) out.push(line(x(s), by + c.laneH / 4, x(s), by + (c.laneH * 3) / 4, ink));
      }
    }

    if (mode === "dimensions") {
      const dash = c.extLines === "dashed" ? ' stroke-dasharray="2 2"' : "";
      if (c.extLines !== "none") {
        out.push(line(p.x1, mid - c.laneH / 2, p.x1, axisY, "muted", dash));
        if (!p.item.current) out.push(line(p.x2, mid - c.laneH / 2, p.x2, axisY, "muted", dash));
      }
      out.push(line(p.x1, mid, p.x2, mid, "ink"));
      out.push(terminator(c.terminator, p.x1, mid, c.laneH, -1));
      if (!p.item.current) out.push(terminator(c.terminator, p.x2, mid, c.laneH, 1));
      for (const s of p.item.splits) out.push(line(x(s), mid - c.laneH / 4, x(s), mid + c.laneH / 4, "ink"));
    }

    if (mode === "ruler") {
      // Callout: a leader from the band up to the label
      out.push(line(p.x1 + 0.5, y0 + fs + 3, p.x1 + 0.5, axisY - band, "muted"));
      const cls = i % 2 ? "muted" : "ink";
      out.push(rect(p.x1 + (i ? 1 : 0), axisY - band, p.x2 - p.x1 - (i ? 1 : 0), band, cls));
    }
  });

  // Event and now lines run from the markers to the axis
  const lineTop = markersH;
  if (c.showEvents)
    for (const e of input.career.events) {
      const ex = x(month(e.date));
      out.push(line(ex + 0.5, lineTop - 2, ex + 0.5, axisY, "muted", c.eventStyle === "dashed" ? ' stroke-dasharray="2 3"' : ""));
      if (onScreen && c.flags) out.push(flag(ex + 0.5, lineTop - 2, axisY, "muted"));
    }

  // Axis: baseline, minor ticks, year ticks and labels
  out.push(line(0, axisY + 0.5, W, axisY + 0.5, "ink"));
  for (let m = Math.ceil(startM / c.tickMonths) * c.tickMonths; m <= endM; m += c.tickMonths) {
    if (m % 12 === 0) continue;
    out.push(line(x(m) + 0.5, axisY, x(m) + 0.5, axisY + c.minorTickH, "muted"));
  }
  const yearLabelY = axisY + c.yearTickH + LABEL + 2;
  // Thin the year labels until they fit, so narrow renders stay legible
  const yearPx = x(12) - x(0);
  const yearChars = c.yearLabels === "full" ? 4 : 3;
  let every = c.yearLabelEvery;
  while (every * yearPx < yearChars * LABEL * MONO_ADVANCE + 6) every++;
  for (let yr = Math.ceil(startM / 12); yr * 12 <= endM; yr++) {
    const yx = x(yr * 12);
    out.push(line(yx + 0.5, axisY, yx + 0.5, axisY + c.yearTickH, "ink"));
    if (c.yearLabels !== "none" && yr % every === 0) {
      const t = c.yearLabels === "full" ? String(yr) : `'${String(yr).slice(2)}`;
      const w = t.length * LABEL * MONO_ADVANCE;
      out.push(`<text x="${r(clamp(yx - w / 2, 0, W - w))}" y="${r(yearLabelY)}" font-size="${LABEL}" class="tl-muted">${t}</text>`);
    }
  }

  let bottom = yearLabelY + 4;
  if (c.showPosts) {
    const py = bottom + 6;
    for (const p of input.posts) out.push(`<circle cx="${r(x(month(p) + 0.5))}" cy="${r(py)}" r="1.25" class="tl-muted"/>`);
    bottom = py + 4;
  }

  if (c.nowStyle !== "light") {
    out.push(line(x(now) - 0.5, lineTop - 2, x(now) - 0.5, axisY + c.yearTickH, "accent"));
    if (onScreen && c.flags) out.push(flag(x(now) - 0.5, lineTop - 2, axisY + c.yearTickH, "red"));
  }
  if (c.nowStyle !== "line") {
    out.push(`<circle cx="${r(x(now))}" cy="${r(axisY + 0.5)}" r="4.5" class="tl-accent" opacity="0.28"/>`);
    out.push(`<circle cx="${r(x(now))}" cy="${r(axisY + 0.5)}" r="3" class="tl-accent"/>`);
  }

  return { body: out.join(""), H: Math.ceil(bottom) };
}

// A marker's caps, top and bottom, like in and out points on a tape
function flag(x: number, y1: number, y2: number, cls: string) {
  return rect(x - 4, y1 - 3, 8, 3, cls) + rect(x - 4, y2, 8, 3, cls);
}

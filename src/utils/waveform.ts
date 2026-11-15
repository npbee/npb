// Shared by every drawn waveform (design/system.md, "The waveform"). Peaks
// are generated, not measured, until the site draws from a real track.

/** A stable seed from a string, so a post keeps the same shape */
export function seedFrom(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  }
  return (h >>> 0) % 2147483646 + 1;
}

/** n peaks in 0..1: a loose envelope with a random walk inside it */
export function peaks(n: number, seed: number) {
  let s = seed;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const out: number[] = [];
  let level = 0.5;
  for (let i = 0; i < n; i++) {
    const x = i / n;
    const envelope =
      Math.sin(Math.PI * Math.min(1, x * 1.15)) ** 0.6 *
      (0.75 + 0.25 * Math.sin(x * 9 + seed));
    level = Math.max(0.15, Math.min(1, level + (rand() - 0.5) * 0.5));
    out.push(Math.max(0.06, envelope * (0.35 + 0.65 * level) * (0.7 + 0.3 * rand())));
  }
  return out;
}

const WORDS_PER_MINUTE = 230;

/** Read time in seconds, from a post's source text */
export function readSeconds(source: string) {
  const words = source.split(/\s+/).filter(Boolean).length;
  return Math.round((words / WORDS_PER_MINUTE) * 60);
}

/** 2:11 */
export function duration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

const MINI_TRACK = 120;
const MINI_HEIGHT = 18;
const MINI_PITCH = 3;

/** A read-time waveform: bars proportional to `fraction` of a full track */
export function miniBars(seed: string, fraction: number) {
  const count = Math.max(3, Math.round(fraction * (MINI_TRACK / MINI_PITCH)));
  return {
    width: MINI_TRACK,
    height: MINI_HEIGHT,
    bars: peaks(count, seedFrom(seed)).map((v, i) => {
      const h = Math.max(2, v * MINI_HEIGHT);
      return { x: i * MINI_PITCH, y: (MINI_HEIGHT - h) / 2, h };
    }),
  };
}

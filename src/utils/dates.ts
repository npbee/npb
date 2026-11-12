// Date formats from design/system.md. Content dates are parsed as UTC
// midnight, so reading local parts would shift them a day in the Americas.
const pad = (n: number) => String(n).padStart(2, "0");

/** 2023.10.23 */
export const fullDate = (d: Date) =>
  `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`;

/** 10.23, for rows under a year divider */
export const monthDay = (d: Date) =>
  `${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`;

/** 2023.10 */
export const yearMonth = (d: Date) =>
  `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}`;

/** 2023-10-23, for datetime attributes */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

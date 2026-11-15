import { getCollection, render } from "astro:content";

// The glob loader's order isn't guaranteed, so demos sort by file name
export async function getDemos() {
  return Promise.all(
    (await getCollection("demos"))
      .toSorted((a, b) => a.id.localeCompare(b.id))
      .map(async (demo) => ({ demo, ...(await render(demo)) })),
  );
}

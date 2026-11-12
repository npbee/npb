import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: "https://npbee.me",
  // Astro 7 defaults to "jsx", which drops whitespace between inline
  // elements; the current templates rely on the older collapsing.
  compressHTML: true,
  integrations: [mdx(), react()],
});

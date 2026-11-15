import { defineConfig, fontProviders } from "astro/config";
import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";
import { codeFigure } from "./src/utils/code-figure.mjs";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: "https://npbee.me",
  // Astro 7 defaults to "jsx", which drops whitespace between inline
  // elements; the current templates rely on the older collapsing.
  compressHTML: true,
  // Weights and styles follow design/system.md
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Mono",
      cssVariable: "--font-plex-mono",
      weights: [400, 500, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Consolas",
        "monospace",
      ],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Newsreader",
      cssVariable: "--font-newsreader",
      weights: [400, 500],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
  ],
  markdown: {
    shikiConfig: {
      // Colors become CSS variables; the post body maps them onto tokens, so
      // syntax follows the theme
      theme: "css-variables",
      transformers: [codeFigure],
    },
  },
  integrations: [mdx(), react()],
});

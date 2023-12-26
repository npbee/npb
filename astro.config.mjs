import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    analytics: true,
    edgeMiddleware: true
  }),
  site: "https://npbee.me",
  integrations: [tailwind({
    applyBaseStyles: false
  }), svelte(), mdx(), react()]
});
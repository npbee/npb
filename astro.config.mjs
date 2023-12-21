import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import svelte from "@astrojs/svelte";

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
  }), svelte()]
});
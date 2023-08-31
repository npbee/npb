import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({ analytics: true, edgeMiddleware: true }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});

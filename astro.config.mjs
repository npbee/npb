import { defineConfig, fontProviders } from "astro/config";
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
  // Weights and styles follow design/system.md
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: [400, 500, 700],
      styles: ["normal"],
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
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
    },
  ],
  integrations: [mdx(), react()],
});

// Tailwind 3 runs through PostCSS directly; @astrojs/tailwind stops at Astro 5.
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwindcss, autoprefixer],
};

const withCSS = require("@zeit/next-css");
const rehypePrism = require("@mapbox/rehype-prism");

const withMDX = require("@next/mdx")({
  options: {
    rehypePlugins: [rehypePrism],
  },
  extension: /\.mdx?$/,
})({ target: "serverless" });

module.exports = withCSS(withMDX);

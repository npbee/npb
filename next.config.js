const withCSS = require("@zeit/next-css");
const highlight = require("remark-highlight.js");

const withMDX = require("@next/mdx")({
  mdPlugins: [highlight],
  extension: /\.mdx?$/,
})({ target: "serverless" });

module.exports = withCSS(withMDX);

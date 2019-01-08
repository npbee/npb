const highlight = require("remark-highlight.js");

const withMDX = require("@zeit/next-mdx")({
  mdPlugins: [highlight],
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  target: "serverless",
});

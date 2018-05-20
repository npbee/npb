const highlight = require("remark-highlight.js");

module.exports = {
  pageExtensions: ["js", "md", "mdx"],
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            mdPlugins: [highlight],
          },
        },
      ],
    });

    return config;
  },
};

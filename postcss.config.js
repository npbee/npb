const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require("tailwindcss"),
    isProd &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./pages/**/*.js", "./components/**/*.js"],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        whitelistPatterns: [/h1/],
      }),
    require("autoprefixer"),
  ],
};

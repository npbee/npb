const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    isProd &&
      require("cssnano")({
        preset: "default",
      }),
  ],
};

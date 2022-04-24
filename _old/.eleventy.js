let { DateTime } = require("luxon");
let util = require("util");
let syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addLayoutAlias("default", "layouts/base.njk");

  eleventyConfig.addPassthroughCopy("./src/site/css");
  eleventyConfig.addPassthroughCopy({ "./public/static": "static" });

  eleventyConfig.addFilter("dump", obj => {
    return util.inspect(obj);
  });

  // Date helpers
  eleventyConfig.addFilter("readableDate", dateObj => {
    let res = DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("LLLL d, y");

    if (res == "Invalid DateTime") {
      console.error(dateObj);
      throw new Error("Invalid date time");
    }

    return res;
  });
  eleventyConfig.addFilter("htmlDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("y-MM-dd");
  });
  eleventyConfig.addFilter("dateYear", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("y");
  });

  // minify the html output when running in prod
  if (process.env.NODE_ENV == "production") {
    eleventyConfig.addTransform(
      "htmlmin",
      require("./src/utils/minify-html.js")
    );
  }

  eleventyConfig.addPairedShortcode("H1", H1);
  eleventyConfig.addPairedShortcode("SummaryText", SummaryText);

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};

function H1(text) {
  let className = [
    "display-font",
    "text-gray-700",
    "text-2xl",
    "leading-relaxed",
    "md:text-4xl",
    "md:leading-relaxed",
  ].join(" ");
  return `<h1 class="${className}">${text}</h1>`;
}

function SummaryText(text) {
  let className = [
    "display-font",
    "text-gray-500",
    "text-md",
    "md:text-xl",
    "leading-relaxed",
    "max-w-lg",
    "md:max-w-prose",
  ].join(" ");
  return `<p class="${className}">${text}</p>`;
}

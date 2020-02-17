let { DateTime } = require("luxon");
let util = require("util");
let syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
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

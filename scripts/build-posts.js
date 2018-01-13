const path = require("path");
const marked = require("marked");
const fs = require("fs");
const globby = require("globby");
const chokidar = require("chokidar");
const chalk = require("chalk");
const highlightJs = require("highlight.js");
const Prism = require("prismjs");

const mapWith = fn => arr => arr.map(fn);
const glob = "pages/**/*.md";

const renderer = new marked.Renderer();

renderer.code = function(code, lang) {
    var out = this.options.highlight(code, lang);

    if (!lang) {
        return "<pre><code>" + out + "\n</code></pre>";
    }

    var classMap = this.options.langPrefix + lang;
    return (
        '<pre class="' +
        classMap +
        '"><code class="' +
        classMap +
        '">' +
        out +
        "\n</code></pre>\n"
    );
};

marked.setOptions({
    renderer,
    highlight: function(code, lang) {
        const language = !lang || lang === "html" ? "markup" : lang;
        if (!Prism.languages[language]) {
            require("prismjs/components/prism-" + language + ".js");
        }
        return Prism.highlight(code, Prism.languages[language]);
        // return highlightJs.highlightAuto(code).value;
    }
});

function markdown(filePath) {
    const content = fs.readFileSync(filePath).toString();
    const html = marked(content);
    const outputFile = path.resolve(filePath).replace(".md", ".json");

    fs.writeFileSync(outputFile, JSON.stringify({ content: html }));

    return { inputFile: filePath, outputFile };
}

function logSuccess({ inputFile, outputFile }) {
    /* eslint-disable */
    console.log(
        `  \u2022 ` +
            chalk.green(`${inputFile} -> ${outputFile}`) +
            chalk.grey(` [${new Date().getTime()}]`)
    );
    /* eslint-enable */
}

const args = process.argv.slice(2);

if (args.includes("--watch")) {
    chokidar.watch(glob).on("all", (event, path) => {
        logSuccess(markdown(path));
    });
} else {
    globby(glob)
        .then(mapWith(markdown))
        .then(mapWith(logSuccess));
}

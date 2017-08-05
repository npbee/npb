const path = require('path');
const marked = require('marked');
const fs = require('fs');
const globby = require('globby');
const chokidar = require('chokidar');
const chalk = require('chalk');

const mapWith = fn => arr => arr.map(fn);
const glob = 'pages/**/*.md';

function markdown(filePath) {
    const content = fs.readFileSync(filePath).toString();
    const html = marked(content);
    const outputFile = path.resolve(filePath).replace('.md', '.json');

    fs.writeFileSync(outputFile, JSON.stringify({ content: html }));

    return { inputFile: filePath, outputFile }
}

function logSuccess({ inputFile, outputFile }) {
    /* eslint-disable */
    console.log(`  \u2022 ` + chalk.green(`${inputFile} -> ${outputFile}`) + chalk.grey(` [${new Date().getTime()}]`));
    /* eslint-enable */
}

const args = process.argv.slice(2);

if (args.includes('--watch')) {
    chokidar.watch(glob).on('all', (event, path) => {
        logSuccess(markdown(path))
    });
} else {
    globby(glob)
        .then(mapWith(markdown))
        .then(mapWith(logSuccess));
}



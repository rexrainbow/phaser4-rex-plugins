const inputMain = process.env.main;  // Required
const production = process.env.preview === '0';

let path = inputMain.split('/');
const inputFileName = path.pop().split('.')[0];
const inputFolder = path.pop();
const exportFolder = (production) ? `${inputFolder}-${inputFileName}` : '_preview';

// Generate boundle.js
const { build } = require('esbuild');
build({
    entryPoints: [inputMain],
    outfile: `./public/${exportFolder}/bundle.js`,
    minify: production,
    bundle: true,
    sourcemap: true,
})
    .then(function () {
        // Generate index.html
        const templatePath = process.env.template || './examples/preview-template.html'
        const capitalize = (s) => { return s.charAt(0).toUpperCase() + s.slice(1) }
        const title = `${capitalize(inputFolder)}-${capitalize(inputFileName)}`
        const sourceCodeLink = (production) ?
            `<p><a href='https://github.com/rexrainbow/phaser4-rex-plugins/blob/master/${inputMain}'>Source code</a></p>` :
            '';

        const fs = require('fs');
        const Mustache = require('mustache');
        fs.readFile(templatePath, function (err, data) {
            data = Mustache.render(data.toString(), {
                TITLE: title,
                SOURCE_CODE: sourceCodeLink
            })
            fs.writeFile(`./public/${exportFolder}/index.html`, data, () => { });
        })
    })
    .catch(() => process.exit(1))
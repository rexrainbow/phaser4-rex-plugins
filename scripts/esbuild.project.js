const inputMain = process.env.main;  // Required
const production = process.env.preview === '0';

let path = inputMain.split('/');
const inputFileName = path.pop().split('.')[0];
const inputFolder = path.pop();
const exportFolder = (production) ? `${inputFolder}-${inputFileName}` : '_preview';
const exportPath = `./public/${exportFolder}`;


// Clear export folder
const del = require('del');
del([exportPath])
    .then(function () {
        // Generate boundle.js
        const { build } = require('esbuild');        
        return build({
            entryPoints: [inputMain],
            outfile: `${exportPath}/bundle.js`,  // Path from root
            minify: production,
            bundle: true,
            sourcemap: (!production),
        })
    })
    .then(function () {
        // Generate index.html
        const templatePath = process.env.template || './examples/preview-template.html'; // Path from root
        const capitalize = (s) => { return s.charAt(0).toUpperCase() + s.slice(1) }
        const title = `${capitalize(inputFolder)}-${capitalize(inputFileName)}`
        const sourceCodeLink = (production) ?
            `<p><a href='https://github.com/rexrainbow/phaser4-rex-plugins/blob/master/${inputMain}'>Source code</a></p>` :
            '';

        const fs = require('fs');
        const Handlebars = require('handlebars');
        const template = Handlebars.compile(fs.readFileSync(templatePath, 'utf-8'));
        const content = template({
            TITLE: title,
            SOURCE_CODE: sourceCodeLink
        });
        fs.writeFileSync(`${exportPath}/index.html`, content); // Path from root
    })
    .catch(() => process.exit(1))
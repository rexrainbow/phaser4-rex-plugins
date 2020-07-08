import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import htmlTemplate from 'rollup-plugin-generate-html-template';

const inputMain = process.env.main;  // Required
const templatePath = process.env.template || 'examples/preview-template.html'
const production = !process.env.ROLLUP_WATCH;

const isTypeScript = (inputMain.split('.').pop() === 'ts');
let path = inputMain.split('/');
const inputFileName = path.pop().split('.')[0];
const inputFolder = path.pop();
const exportFolder = (production) ? `${inputFolder}-${inputFileName}` : '_preview';
const sourceCodeLink = (production) ?
    `<p><a href='https://github.com/rexrainbow/phaser4-rex-plugins/blob/master/${inputMain}'>Source code</a></p>` :
    '';

const capitalize = (s) => { return s.charAt(0).toUpperCase() + s.slice(1) }


export default {

    input: inputMain,

    output: [
        {
            file: `public/${exportFolder}/bundle.js`,
            format: 'iife',
            name: 'Phaser4Game',
            sourcemap: true
        }
    ],

    plugins: [
        resolve({
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }),

        commonjs(),

        isTypeScript && typescript({
            tsconfig: './tsconfig.preview.json'
        }),

        production && terser(),

        htmlTemplate({
            template: templatePath,
            target: `public/${exportFolder}/index.html`,
            replaceVars: {
                __TITLE__: `${capitalize(inputFolder)}-${capitalize(inputFileName)}`,
                __SOURCE_CODE__: sourceCodeLink
            }
        })
    ],

    watch: {
        include: '**/*.ts'
    },

};
import resolve from '@rollup/plugin-node-resolve';

const inputSrc = process.env.src;  // Required
const outputFolder = process.env.outputfolder || 'public';

export default {

    input: inputSrc,

    output: [
        {
            file: `${outputFolder}/bundle.js`,
            format: 'iife',
            name: 'Phaser4Game',
            sourcemap: true
        }
    ],

    plugins: [
        resolve()
    ]

};
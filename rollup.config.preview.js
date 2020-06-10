import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const inputSrc = process.env.src;  // Required
const outputFolder = process.env.outputfolder || 'public';
const isTypeScript = (inputSrc.split('.').pop() === 'ts');

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
        resolve({
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }),
        isTypeScript && typescript({
            tsconfig: './tsconfig.json'
        })
    ]

};
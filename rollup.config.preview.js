import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const inputMain = process.env.main;  // Required
const outputFolder = process.env.outputfolder || 'public';
const isTypeScript = (inputMain.split('.').pop() === 'ts');

export default {

    input: inputMain,

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
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import htmlTemplate from 'rollup-plugin-generate-html-template';

const inputMain = process.env.main;  // Required
const isTypeScript = (inputMain.split('.').pop() === 'ts');

export default {

    input: inputMain,

    output: [
        {
            file: `public/_preview/bundle.js`,
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
        htmlTemplate({
            template: 'examples/template.html',
            target: 'public/_preview/index.html',
        })
    ],

    watch: {
        include: '**/*.ts'
    },

};
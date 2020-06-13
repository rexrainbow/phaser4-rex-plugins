import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

// Clear dist folder before building
const del = require('del');
del.sync(['./dist']);


let outputs = [];
const extensions = [
    '.js', '.jsx', '.ts', '.tsx'
];

const pluginList = require('./plugins-list.js');

// Minify
for (var key in pluginList) {
    outputs.push({
        input: pluginList[key],
        output: [
            {
                file: `./dist/rex${key}.min.js`,
                format: 'umd',
                name: `rex${key}`,
                sourcemap: false,
                esModule: false,
                plugins: [
                    terser()
                ]
            }
        ],
        plugins: [
            resolve({
                extensions: extensions
            }),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.preview.json' // Won't generate d.ts
            }),
        ]
    })
}

const jsOutputs = {};
for (var key in pluginList) {
    jsOutputs[`rex${key}`] = pluginList[key];
}

// ESM
//  outputs.push({
//      input: jsOutputs,
//      output: [
//          {
//              dir: 'dist',
//              format: 'esm'
//          }
//      ],
//      plugins: [
//          resolve({
//              extensions: extensions
//          }),
//          commonjs(),
//          typescript({
//              tsconfig: './tsconfig.build.json'
//          }),
//      ]
//  })



export default outputs;
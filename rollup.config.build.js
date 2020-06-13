import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const pluginList = require('./plugin-list.js');
const tsOutputs = {};

for(let key in pluginList) {
    tsOutputs[`rex${key}.ts`] = pluginList[key];
}

const extensions = [
    '.js', '.jsx', '.ts', '.tsx'
];
let outputs = [];
outputs.push({
    input: tsOutputs,
    output: [
        {                
            dir: 'dist',
            format: 'esm'
        }
    ],
    plugins: [
        resolve({
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json'
        }),
    ]
})

export default outputs;
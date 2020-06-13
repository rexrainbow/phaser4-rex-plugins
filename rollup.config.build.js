import del from 'del';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';


let outputs = [];
const extensions = [
    '.js', '.jsx', '.ts', '.tsx'
];

const pluginList = require('./plugins-list.js');

// UMD
del.sync(['./dist/umd']);
for (var key in pluginList) {
    //  UMD Bundle
    outputs.push({
        input: pluginList[key],
        output: [
            {
                file: `./dist/umd/rex${key}.js`,
                format: 'umd',
                name: `rex${key}`,
                sourcemap: true,
                esModule: false                
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

    //  UMD Minified Bundle
    outputs.push({
        input: pluginList[key],
        output: [
            {
                file: `./dist/umd/rex${key}.min.js`,
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
del.sync(['./dist/esm']);
outputs.push({
    input: jsOutputs,
    output: [
        {
            dir: './dist/esm',
            format: 'esm'
        }
    ],
    plugins: [
        resolve({
            extensions: extensions
        }),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.build.json'
        }),
    ]
})



export default outputs;
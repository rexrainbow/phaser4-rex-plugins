const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const inputMain = process.env.main;  // Required
const production = process.env.preview === '0';
const preview = !production;

let pathes = inputMain.split('/');
const inputFileName = pathes.pop().split('.')[0];
const inputFolder = pathes.pop();

const rootPath = path.resolve(__dirname, '..');
const exportFolder = (production) ? `${inputFolder}-${inputFileName}` : '_preview';
const exportFolderPath = `${rootPath}/public/${exportFolder}`;
const htmlTemplate = process.env.htmltemplate || `${rootPath}/examples/preview-template.html`;

module.exports = {
    mode: ((preview) ? 'development' : 'production'),
    entry: inputMain,
    devtool: 'cheap-source-map',
    output: {
        filename: 'bundle.js',
        path: exportFolderPath,
    },
    watch: preview,
    plugins: [
        new HtmlWebpackPlugin({
            filename: `${exportFolderPath}/index.html`,
            template: htmlTemplate,
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false
            },
            hash: false
        }),
        preview && new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: exportFolderPath,
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: `${rootPath}/tsconfig.build.json`
                    }
                }],
                exclude: /node_modules/,
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}
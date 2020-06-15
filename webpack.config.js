const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const inputMain = process.env.main;  // Required
const outputFolder = process.env.outputfolder || 'public';

module.exports = {
    mode: 'development',
    entry: inputMain,
    devtool: 'cheap-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, outputFolder),
    },
    watch: true,
    plugins: [
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: outputFolder,
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}
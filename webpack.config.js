const path = require('path');
const config = module.exports = {
    entry:path.resolve(__dirname,'src/index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname) + "/dist",
        libraryTarget:'umd',
        libraryExport:'default',
        globalObject:'this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ],

    },
    mode:"development"
};

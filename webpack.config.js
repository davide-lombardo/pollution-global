const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');



module.exports = (env, argv) => {

    const entryPath = argv.mode === 'development' ? './src/index_dev.js' : './src/index.js'
    return {
        entry: {

            main: path.resolve(__dirname, entryPath),
        },
        output: {
            // Una volta creato un pacchetto WebPack metterà i file risultanti nella cartella build
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'build')
        },
        module: {
            rules: [{
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        devServer: {
            contentBase: './build',
            open: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Global Air Pollution",
                template: path.resolve(__dirname, './src/index.html'),
                filename: "index.html",
            }),

            new CleanWebpackPlugin(),

            new Dotenv()
        ]
    }
};
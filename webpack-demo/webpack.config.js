const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const path = require("path");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, './src/index.js'),

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build'),
        // libraryTarget: 'umd'
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        attrs: ['img:src', 'link:href']
                    }
                }]
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                },
                include: path.resolve(__dirname, '/src'),
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: [{
                    // loader: 'file-loader',
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        // name: '[name].[ext]',
                        name: '[name]-[hash:8].[ext]',
                        outputPath: 'images/',

                    }
                }]
            },
            {
                test: /\.pug$/,
                use: {
                    loader: 'pug-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
            },

        ],
    },
    plugins: [
        new CleanWebpackPlugin(),


        new HtmlWebpackPlugin({
            hash: true,
            // template: "src/index.html",
            template: "src/index.pug",
            filename: "bundle.html",
        }),

        new MiniCssExtractPlugin({
            filename: "bundle.css",
            chunkFilename: "index.css"
        }),

    ],

}
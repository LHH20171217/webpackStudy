const getPath = require('./getPath')

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const path = require("path");


// console.log("getView", getView)

module.exports = {
    mode: "development",
    entry: {
        ...getPath.jsPathList
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js',
        publicPath: '../',
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
                        outputPath: './images', //指定放置目标文件的文件系统路径
                        publicPath: '../images' //指定目标文件的自定义公共路径
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
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        //输出html文件1
        // new HtmlWebpackPlugin({
        //     hash: true,
        //     template: "./src/main/main.html", //本地html文件模板的地址
        //     filename: "html/main.html",
        //     chunks: ['main'],
        // }),

        // new HtmlWebpackPlugin({
        //     hash: true,
        //     template: "./src/side/side.html",
        //     filename: "html/side.html",
        //     chunks: ['side'],
        // }),
        ...getPath.htmlPathList,

        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "./src/[name]/[name].css"
        }),

    ]
}
const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 *
 * @param {string}  globPath  文件的路径
 * @returns entries
 */

function getPath(globPath) {
    let files = glob.sync(globPath);

    let entries = {},
        entry, dirname, basename, extname;

    files.forEach(item => {
        entry = item;
        dirname = path.dirname(entry); //当前目录
        extname = path.extname(entry); //后缀
        basename = path.basename(entry, extname); //文件名
        //文件路径
        if (extname === '.html') {
            entries[basename] = entry;
        } else if (extname === '.js') {
            entries[basename] = entry;
        }
    });

    return entries;
}

const jsPath = getPath('./src/*/*.js');
const htmlPath = getPath('./src/*/*.html');
const jsPathList = {};
const htmlPathList = [];

Object.keys(jsPath).forEach((item) => {
    jsPathList[item] = path.resolve(__dirname, jsPath[item])
})

Object.keys(htmlPath).forEach((item) => {
    htmlPathList.push(new HtmlWebpackPlugin({
        hash: true,
        template: htmlPath[item],
        filename: `html/${item}.html`,
        chunks: [item],
    }))
})

// console.log("htmlPathList", htmlPathList)


module.exports = {
    jsPathList,
    htmlPathList
}
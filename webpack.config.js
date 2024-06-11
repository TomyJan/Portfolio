const path = require('path') // 引用path模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode:'production',
    entry:"./assets/js/script.js",
    output:{
        // 输出的路径  是绝对路径(导入path模块) 这里是用node来做的
        path:path.resolve(__dirname,'dist'),
        // 输出的文件名称
        filename:'bundle.min.[hash].js',
    },
    devServer: {
        port: 5160,
        open: true // 编译完成自动打开浏览器
    },
    // 配置插件
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html',
            minify: {
                collapseWhitespace: true, // 干掉空格
                removeComments: true, // 干掉注释
                removeAttributeQuotes: true, // 干掉双引号
                removeEmptyAttributes: true // 干掉空属性
            }
        }),
        new copyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'assets/images'), to: path.resolve(__dirname, 'dist/assets/images') },
            ]
        }),
    ],
    // 配置loader
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    performance: {
        maxAssetSize: 2097152,  // 最大资产大小（以字节为单位）
        maxEntrypointSize: 524288,  // 最大入口点大小（以字节为单位）
        hints: "warning"  // 设置为`false`以完全关闭性能提示
    },
}

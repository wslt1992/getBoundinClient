/**
 * Created by Administrator on 2018/6/16/016.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode:'development',
    entry: {
        app: './src/js/index.js',
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {    
                test: /\.js$/,    
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                  }
            },  
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|svg)/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1024*10,
                        outputPath: 'imgs/'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8,
                        outputPath: 'font/'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '天猫',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval',
    // devtool:'inline-source-map',
    devServer: {
        contentBase: './dist',
        // hot:true
    }

};
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
 //对CSS进行切割，替代style-loader，但是因为不支持热更新，所以只能在生产环境下使用,同时默认还有合并多个css文件的功能
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
  mode: 'production',    
  devtool: 'cheap-module-map', 
  output: {
    filename: "[name].[contenthash].js",    //添加了contenthash可以在打包的文件后面添加hash值，防止文件内容发生改变时浏览器使用缓存值
    chunkFilename: "[name].[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 
              {
                loader:'css-loader',
                options: {
                   importLoaders: 2,   
                   modules: true    
                }
              },
              'postcss-loader','sass-loader']  
      },{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 
             'css-loader',
            'postcss-loader']  
      }]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],   //对css代码进行压缩
  },
  plugins: [
    new  MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css"
    })
  ]
}

module.exports = merge(commonConfig,prodConfig)
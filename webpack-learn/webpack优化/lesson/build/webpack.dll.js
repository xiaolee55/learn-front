//将第三方模块单独进行打包，生成一个dll的打包结果
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['react','react-dom','lodash'],   //这里可以拆分成多个文件，对应多个全局变量
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname,'../dll'),
    library: '[name]'    //dll打包的文件通过library以全局变量vendors的方式暴露出去
  },
  plugins: [
    new webpack.DllPlugin({  //表示用这个插件来分析name这个库，并生成一个映射文件
      name: "[name]",
      path: path.resolve(__dirname,'../dll/[name].manifest.json')
    })
  ]
}
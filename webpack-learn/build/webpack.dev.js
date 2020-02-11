//引入路径模块
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')  //用来合并公有配置和开发环境（线上环境）
const commonConfig = require('./webpack.common.js') 

const devConfig = {
  mode: 'development',        //配置打包环境，如果是production就是生产环境，会对代码进行压缩，如果是development就是开发环境，不会对代码进行压缩
  
  devtool: 'cheap-module-eval-source-map',  
  //none表示不作任何映射，速度最快，eval表示会映射到转换后的代码，
  //inline表示映射的代码加到打包文件里面，source-map表示生成映射文件
  //，module表示一些loader的错误也打印出来,cheap表示只映射行数，不具体检测在哪一列

  //development  devtool: 'cheap-module-eval-source-map'
  //production  devtool: 'cheap-module-source-map'
  output: {              //配置出口信息
    publicPath: './',  //配置出口文件的默认公共url，应用场景是在把文件放在一些CDN上时，可通过url直接加载js文件
    filename: '[name].js',  //打包好的文件的名称，默认为main.js，用[name]这种形式就是占位符，可以容纳多个出口文件
    chunkFilename: '[name].chunk.js', //如果是间接引入的JS文件（就是不是直接在HTML文件引入的，就走这个配置）
    path: path.resolve(__dirname, '../dist') //打包好的文件所在的目录
  },
  module: {
    rules: [
      {
        test: /\.css$/,
         //注意顺序，style-loader要在前面（因为要先解析css才能挂载到style，而webpack的执行顺序是从右到左），
         //css-loader就是帮我们理清所有css文件之间的关系，style-loader则是把样式挂载到HTML文档中的head中的style标签中
        use: ['style-loader', 
              {
                loader:'css-loader',
                options: {
                   importLoaders: 2,   //表示处理每个import要经过的loader数量（下面有两个loader，所以是2）
                   modules: true       //表示CSS模块化，即每个JS文件导入的css都不会影响其他js的元素（模块化只对类名有效，其他的选择器不会做哈希处理）
                }
              },
              'postcss-loader','sass-loader']  
      },{
        test: /\.css$/,
        use: ['style-loader', 
             'css-loader',
            'postcss-loader']  
      }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  //开启一个服务器，可以发送请求，配置实时刷新，自动打开浏览器，跨域等
  devServer: {
    contentBase: './dist',
    open:true,   //自动打开浏览器
    proxy: {
      '/api' : 'http://localhost:3000'
    },
    port: 8080,
    hot: true,  //因为devserver默认会刷新页面，但有时候我们不需要刷新页面，所以需要这个hot，配合webpack自带插件webpack.HotModuleReplacementPlugin使用
    // hotOnly: true   //热更新失败时不会刷新页面
  }


}

module.exports = merge(commonConfig,devConfig)
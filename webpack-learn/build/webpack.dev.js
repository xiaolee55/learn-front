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
 
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {   
    //在开发环境下配置这个则可以开启TreeShaking，动态打包modules代码,如果是production环境，则不需要此配置,因为mode:production自带treeShaking
    //注意：这个配置只起到标记的作用，不会真正删除，只有在生产环境下才能真正删除
    // treeshking是减小打包的bundle size很重要的一个手段，但触发treeshking是有条件的，首先需要代码是es module规范的并且使用解构赋值的方式引入，
    // 第二要开始optimization.usedExports来标记使用和未使用的模块，第三是使用压缩的插件进行删除未使用代码。 webpack4的mode设置为production之后，
    // 我们只需要关心第一点就好了。
    usedExports: true
  },

  //开启一个服务器，可以发送请求，配置实时刷新，自动打开浏览器，跨域等
  devServer: {
    contentBase: './bundle',
    open:true,   //自动打开浏览器
    proxy: {
      '/api' : 'http://localhost:3000'
    },
    port: 8081,
    hot: true,  //因为devserver默认会刷新页面，但有时候我们不需要刷新页面，所以需要这个hot，配合webpack自带插件webpack.HotModuleReplacementPlugin使用
    // hotOnly: true   //热更新失败时不会刷新页面
  }


}

module.exports = merge(commonConfig,devConfig)
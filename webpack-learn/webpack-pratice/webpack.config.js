const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: ["lodash"],  //用户在其本地也可能会安装lodash这个库，所以配置这个表示让用户忽略lodash这个包，防止重复打包
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'library.js',
    library: 'library',   //支持以链接形式引入，以全局变量的方式挂载到脚本上，library就是变量名
    libraryTarget: 'umd'   //支持任何形式引入库，AMD，CMD，EsModules，如果参数改为this就是挂载到this下面，window就是window下面
  },
  devServer: {
    contentBase: './dist',
    open:true,
    port:8080,
    hot:true,
    historyApiFallback:true,  //配置路由相关，解决history模式下刷新页面丢失的问题
    proxy: {  //代理
      '/react/api': {
        target: 'http://www.dell-lee.com', //代理网站
        secure: false,  //https对应配置
        pathRewriter: {  //请求错误的重定向
          'header.json': 'demo.json'
        },
        changeOrigin: true,
        headers: {  //配置HTTP的头问价
          host: 'www.dell-lee.com'
        }
      }
    }
  }
}
//webpack配置文件
const path = require('path')
//引入插件，plugin可以在webpack运行到某一时刻的时候，帮你做一些事情

//下面的插件就是在打包结束后生成一个HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

//在打包开始前将打包目录的文件夹清空，防止出现过多没用的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const webpack = require('webpack')

module.exports = {
  mode: 'development',        //配置打包环境，如果是production就是生产环境，会对代码进行压缩，如果是development就是开发环境，不会对代码进行压缩
  
  devtool: 'source-map',   //
  //none表示不作任何映射，速度最快，eval表示会映射到转换后的代码，
  //inline表示映射的代码加到打包文件里面，source-map表示生成映射文件
  //，module表示一些loader的错误也打印出来,cheap表示只映射行数，不具体检测在哪一列

  //development  devtool: 'cheap-module-eval-source-map'
  //production  devtool: 'cheap-module-source-map'

  entry:{    //配置打包的入口文件，下面这种形式，键就是出口文件的名称，值就是入口文件地址
   main: './src/index.js',
  //  bundle: './src/index.js'
  } ,

  output: {              //配置出口信息
    publicPath: '/',  //配置出口文件的默认公共url，应用场景是在把文件放在一些CDN上时，可通过url直接加载js文件
    filename: '[name].js',  //打包好的文件的名称，默认为main.js，用[name]这种形式就是占位符，可以容纳多个出口文件
    path: path.resolve(__dirname, 'bundle') //打包好的文件所在的目录
  },
 
  module: {  //只要引入的模块不是js，比如图片，vue之类，都要使用loader，因为webpack默认只能打包js文件
    rules: [{ //规定.jpg格式的打包工具
      test: /\.jpg|png|gif$/,
      use: {
        // loader: 'file-loader',
        // options: {
        //   name: "[name]_[hash].[ext]",  //表示打包后的图片的名字由原来的名称和哈希值通过下划线相连
        //   outputPath: 'images/'         //规定图片的输出目录
        // }
        loader: 'url-loader', //url-loader可以实现file-loader的所有功能，但是url-loader可以选择是否以base64的形式压缩图片并嵌入JS代码中的
        options: {
          name: "[name]_[hash].[ext]",
          outputPath: 'images/',
          limit: 1024000     //规定小于10kb就以base64压缩放到JS代码中，否则就放在指定的目录中
        }
      }
    },{
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
      test: /\.(eot|ttf|svg|woff)$/,    //处理字体文件
      use: {
        loader: 'file-loader'
      }
    }]
  },
 
  plugins: [
    new HtmlWebpackPlugin({  //这个插件的作用是生成一个HTML文件并把打包的JS进行引入
      template: 'src/index.html'    //自定义HTML模板
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()],

  //开启一个服务器，可以发送请求，配置实时刷新，自动打开浏览器，跨域等
  devServer: {
    contentBase: './bundle',
    open:true,   //自动打开浏览器
    proxy: {
      '/api' : 'http://localhost:3000'
    },
    port: 8081,
    hot: true,  //因为devserver默认会刷新页面，但有时候我们不需要刷新页面，所以需要这个hot，配合webpack自带插件webpack.HotModuleReplacementPlugin使用
    hotOnly: true
  }


}
//提取生产环境和开发环境的共用代码

//引入路径模块
const path = require('path')
//引入插件，plugin可以在webpack运行到某一时刻的时候，帮你做一些事情

//下面的插件就是在打包结束后生成一个HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

//在打包开始前将打包目录的文件夹清空，防止出现过多没用的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry:{    //配置打包的入口文件，下面这种形式，键就是出口文件的名称，值就是入口文件地址
    main: './src/index.js',
    // lodash: './src/lodash.js'
   //  bundle: './src/index.js'
   } ,
 
   output: {              //配置出口信息
     publicPath: './',  //配置出口文件的默认公共url，应用场景是在把文件放在一些CDN上时，可通过url直接加载js文件
     filename: '[name].js',  //打包好的文件的名称，默认为main.js，用[name]这种形式就是占位符，可以容纳多个出口文件
     path: path.resolve(__dirname, '../bundle') //打包好的文件所在的目录
   },
 
   module: {  //只要引入的模块不是js，比如图片，vue之类，都要使用loader，因为webpack默认只能打包js文件
    rules: [{
      test: /\.js$/,   //遇到JS文件就用babel-loader处理
      exclude: /node_modules/,
      loader: "babel-loader",
    },{ //规定.jpg格式的打包工具
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
    new CleanWebpackPlugin({//自动清空上次打包剩余的文件
      root: path.resolve(__dirname,'../') //配置以根目录
    })  
  ],
  optimization: {
    splitChunks: {  
      chunks: 'all',   //值为async表示配置只对异步代码起效，initial表示对同步代码进行代码分割，all表示对同步异步代码都有效，默认值是async
      minSize: 30000,  //表示打包的文件大于规定的字节数才做代码分割
      maxSize: 50000,  //如果打包后的文件大小大于这个参数规定的字节，那么会再次进行分割
      minChunks: 1,   //表示这个模块至少被引入多少次才会进行分割
      maxInitialRequests:3,  //表示从入口文件最多分割成3个JS文件
      maxAsyncRequests:5,   //表示每个文件最多只能分割成5个JS文件
      automaticNameDelimiter: '~',  //表示打包文件的默认连接符
      name: true,  //true表示让CacheGroup里面的filename有效
      cacheGroups: {   //chunks和CacheGroups是配合使用的
        vendors: {
          test: /[\\/]node_modules[\\/]/, //检测是否存在于node_modules中，不存在则vendors中的配置全部失效
          // filename: 'vendors.js',         //配置这些分割代码的打包出口文件的名称
          priority: -10    //表示优先级，值越大优先级越高，如果某个模块符合多个要求，则走优先级高的配置
        },
        default: {   //所有模块都符合default的要求，因为他没又限制，而上面的vendors限制了要在node_modules下 
          priority: -20,
          reuseExistingChunk: true,   //假如index引入了a,b两个模块，a又引入了b模块，那么配置这个参数就防止了b模块的重复打包
          filename: 'common.js'
        }
      }
    }
  }
}
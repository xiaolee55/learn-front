//提取生产环境和开发环境的共用代码

//引入路径模块
const path = require('path')
//引入插件，plugin可以在webpack运行到某一时刻的时候，帮你做一些事情

//下面的插件就是在打包结束后生成一个HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

//在打包开始前将打包目录的文件夹清空，防止出现过多没用的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const webpack = require('webpack')

module.exports = {
  entry:{    //配置打包的入口文件，下面这种形式，键就是出口文件的名称，值就是入口文件地址
    main: './src/index.js',
    // lodash: './src/lodash.js'
   //  bundle: './src/index.js'
   } ,
 
   module: {  //只要引入的模块不是js，比如图片，vue之类，都要使用loader，因为webpack默认只能打包js文件
    rules: [{
      test: /\.js$/,   //遇到JS文件就用babel-loader处理
      exclude: /node_modules/,
      use: ["babel-loader","imports-loader?this=>window"]   //使用imports-loader来改变webpack导致的this的默认指向
      // loader: 'babel-loader'
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
      test: /\.(eot|ttf|svg|woff)$/,    //处理字体文件
      use: {
        loader: 'file-loader'
      }
    }]
  },
  performance: false,  //表示不要提示性能相关的警告
  plugins: [
    new HtmlWebpackPlugin({  //这个插件的作用是生成一个HTML文件并把打包的JS进行引入
      template: 'src/index.html'    //自定义HTML模板
    }),
    new CleanWebpackPlugin({//自动清空上次打包剩余的文件
      root: path.resolve(__dirname,'../') //配置以根目录
    }),
    new webpack.ProvidePlugin({   
      $: 'jquery',   //表示当遇到$符号的时候，就自动导入jQuery
      _join: ['lodash', 'join']  //表示使用lodash中的join方法
    })
  ],
  optimization: {
      //在开发环境下配置usedExports: true则可以开启TreeShaking，动态打包modules代码,如果是production环境，则不需要此配置,因为mode:production自带treeShaking
      //注意：这个配置只起到标记的作用，不会真正删除，只有在生产环境下才能真正删除
      // treeshking是减小打包的bundle size很重要的一个手段，但触发treeshking是有条件的，首先需要代码是es module规范的并且使用解构赋值的方式引入，
      // 第二要开始optimization.usedExports来标记使用和未使用的模块，第三是使用压缩的插件进行删除未使用代码。 webpack4的mode设置为production之后，
      // 我们只需要关心第一点就好了。
    usedExports: true,
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
        styles: { //在有多入口文件时，配置这个可以让CSS统一打包到一个叫styles的文件之中
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
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

  //使用全局变量env，配合pack.json中的script，可以实现单文件判断环境并合并公有环境或者开发环境
  // module.exports = (env) => {
  //   if(env && env.production) {
  //     return merge(commonConfig, prodConfig);
  //   }else {
  //     return merge(commonConfig, devConfig);
  //   }
  // }
  
}
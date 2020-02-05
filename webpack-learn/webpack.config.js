//webpack配置文件
const path = require('path')

module.exports = {
  mode: 'production',        //配置打包环境，如果是production就是生产环境，会对代码进行压缩，如果是development就是开发环境，不会对代码进行压缩
  entry: './src/index.js',   //配置打包的入口文件
  output: {              //配置出口信息
    filename: 'bundle.js',  //打包好的文件的名称
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
  }
}
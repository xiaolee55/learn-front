const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")

module.exports = {
	entry: {
		main: './src/index.js',
	},
	// resolve: {
	// 	//当import的内容没有写后缀的时候就来这里寻找，看加上这个后缀有没有对应的文件
	// 	//性能优化点之一，不疑配置过多，因为要消耗查询性能
	// 	extensions: ['js','jsx'],
	// 	//配置一个目录的入口文件名，这样在导入的时候就可以直接通过目录，而不是文件名（同样不宜过多，降低查找损耗）
	// 	mainFiles: ["index","child"],
	// 	alias: {  //别名配置
	// 		'@': path.resolve(__dirname,'../src')
	// 	}
	// },
	module: {
		rules: [{ 
			test: /\.jsx?$/,    //加个x?表示可以处理有x或者无x的情况
			exclude: /node_modules/,  //优化点之一，避免重复解析node_modules中的代码，因为其已经是被打包过的
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			_join: ['lodash', 'join']
		}),
		new AddAssetHtmlWebpackPlugin({   //将一些静态文件引入HTML，常用在将第三方库打包好后再引入HTML，防止每次都引入
			filepath: path.resolve(__dirname,"../dll/vendors.dll.js")
		}),
		new webpack.DllReferencePlugin({ 
			//  配合webpack.DllPlugin使用，去找已打包好的第三方模块的映射关系，这样就不用每次都去node_modules中找了，而是在我们打包的文件中找
			//  只有配置了这个内容才会去找已经打包的第三方模块，否则不会
			manifest: path.resolve(__dirname,'../dll/vendors.manifest.json')
		})
	],
	optimization: {
		runtimeChunk: {   
		//生成一个runtime.js的文件，存的是manifest(包和包之间的关系)，如果不抽离出来，则每次打包都会变化，导致hash变化
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
      chunks: 'all',
      cacheGroups: {
      	vendors: {
      		test: /[\\/]node_modules[\\/]/,
      		priority: -10,
      		name: 'vendors',
      	}
      }
    }
	},
	performance: false,
	output: {
		path: path.resolve(__dirname, '../dist')
	}
}
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: '',
  entry: {
    main: './src/index.js'
  },
  resolveLoader: {
    modules: ['node_modules','./loaders']  //表明如果要加载一个loader，先去node_modules中去找，没有再到loaders中去找
  },
  module: {
    rules: [{
      test: /\.js/,
      use: [{
        loader: path.resolve(__dirname,'./loaders/replaceLoaderAsync.js')
      },{
        loader: path.resolve(__dirname,'./loaders/replaceLoader.js'),
        options: {
          name: 'lee'
        }
      }]
    }]
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js'
  }
}

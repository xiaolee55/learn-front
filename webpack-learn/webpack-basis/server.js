//模拟devserver，在node中使用webpack
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const complier = webpack(config)  //编译代码

const app = express()
app.use(webpackDevMiddleware(complier,{  //检测代码变化就进行重编译
  publicPath: config.output.publicPath
}))

app.listen(3000, ()=>{
  console.log('server is running')
})
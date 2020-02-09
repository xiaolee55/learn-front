package.json中
//在打包命令上加入--profile --json > stats.json就能生成stats.json文件，借助这个文件和网上的工具可以分析打包的情况
//"sideEffects" 配合 TreeShaking使用，防止TreeShaking在import没有导入任何值的情况下将其删除，比如polyfill就是将一些对象绑定在window全局对象上，但是没有导出任何内容，没有配sideEffects就会被误删
// "main": "index.js",    //向外暴露的文件入口
//"private": true,        //表示私有项目，不发布到npm
//  "scripts": {     //会先到node_modules下查看是否安装了webpack，所以不用担心全局的问题，这样直接运行npm run bundle即可打包，而不用npx webpack
    "bundle": "webpack"
  }

   webpack-cli的作用就是让我们能在命令行运行webpack这个命令

  ## webpack启动的三种方式

  **global全局安装:**
  webpack index.js

  **local局部安装：**
  npx webpack index.js

  **npm script 自定义启动脚本**
  npm run bundle

  ## webpack.config.js
  
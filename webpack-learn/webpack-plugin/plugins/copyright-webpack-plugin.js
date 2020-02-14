class CopyrightWebpackPlugin {
  constructor(options) {  //options是配置文件传过来的参数
    console.log(options);
    console.log('插件被使用了');
  }
  apply(compiler) {  //compiler存放了所有配置相关的内容
    
    //同步钩子
    compiler.hooks.compile.tap('CopyrightWebpackPlugin',(compilation)=>{
      console.log('compiler')
    })
    //异步钩子
    compiler.hooks.emit.tapAsync("CopyrightWebpackPlugin",(compilation,cb)=>{ //emit钩子表示打包完成
      // compilation存储了和本次打包相关的内容
      compilation.assets['copyright.txt']= {  //添加一个copyright的文件
        source: function() {
          return 'copyright by lee'
        },
        size: function() {
          return 21
        }
      }
      cb()
    })
  }
}

module.exports = CopyrightWebpackPlugin
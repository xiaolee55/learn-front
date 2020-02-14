const loaderUtils = require('loader-utils')

module.exports = function(source) {
  const options = loaderUtils.getOptions(this)  //帮助我们更好地获取可用参数
  console.log(this.query)   //this.query能获得options传递过来的数据
  return source.replace('lee','李')
  //return语句可以使用this.callback(null,result)来替代，功能更加强大

  //如果想在loader里面使用异步操作，则可以使用thi.async()(会阻塞打包时间)，参数结构和this.callback一样
}

// loader场景，主要是对代码进行包装
// 异常的捕获可以借助loader来实现，这样就不会使得我们的代码太难看
// 切换中英文
// if(NODE全局变量==="中文"){
//   source.replace('{{title}}','中文标题')
// }else{
//   source.replace('{{title}}','英文标题')
// }
Function.prototype.myCall = function(context=window,...args) {   //设一个数组来接收所有参数
  if(this === Function.prototype) {//call不能直接调用，而要由函数调用
    return undefined //防止Function.prototype.myCall()直接调用
  }
  
  context = context || window
  const fn = Symbol()  //创建一个唯一的名字来存储调用的函数
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]   //调用完成立刻删除
  return result    //返回调用结果
}
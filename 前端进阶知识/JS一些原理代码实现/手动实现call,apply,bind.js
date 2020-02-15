//call的实现
// 1.判断当前this是否为函数，防止Function.prototype.myCall() 直接调用
// 2.context 为可选参数，如果不传的话默认上下文为 window
// 3.为context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
// 4.处理参数，传入第一个参数后的其余参数
// 4.调用函数后即删除该Symbol属性
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

let obj = {a:1}
// function test(a,b,c) {
//   console.log(this.a,a,b,c);
// }
// test.myCall(obj,1,2,3)

//apply实现
//大体和call相同，除了参数的接收是以实际数组而非扩展数组以外
Function.prototype.myApply = function (context = window, args) {
  if (this === Function.prototype) {
    return undefined; // 用于防止 Function.prototype.myCall() 直接调用
  }
  const fn = Symbol();
  context[fn] = this;
  let result;
  if (Array.isArray(args)) {   //如果传入的是一个数组就调用这个数组参数
    result = context[fn](...args);
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
}


//bind函数
// 1.处理参数，返回一个闭包
// 2.判断是否为构造函数调用，如果是则使用new调用当前函数
// 3.如果不是，使用apply，将context和处理好的参数传入
Function.prototype.myBind = function (context,...args1) {
  if (this === Function.prototype) {
    throw new TypeError('Error')
  }
  const _this = this   //保存首次绑定的this
  console.log(context);
  
  return function F(...args2) {
    // 判断是否用于构造函数,用于构造函数则不作绑定
    if (this instanceof F) {
      return new _this(...args1, ...args2)
    }
    return _this.apply(context, args1.concat(args2))
  }
}

let obj1 = {a:2}
function test1(a,b,c) {
  // console.log(this.a,a,b,c);
}
test1.myBind(obj1,1,2,3).myBind(obj)
// 逐步接收参数，并缓存供后期计算使用
// 不立即计算，延后执行
// 符合计算的条件，将缓存的参数，统一传递给执行方法

function currying(fn){
  var allArgs = [];

  function next(){
      var args = [...arguments];
      allArgs = allArgs.concat(args);
      return next;
  }
  // 字符类型
  next.toString = function(){
      return fn.apply(null, allArgs);
  };
  // 数值类型
  next.valueOf = function(){
      return fn.apply(null, allArgs);
  }

  return next;
}
var add = currying(function(){
  var sum = 0;
  for(var i = 0; i < arguments.length; i++){
      sum += arguments[i];
  }
  return sum;
});

const a = currying(add)

console.log(a(1)(2)(3))


// 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。

// 偏函数则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。
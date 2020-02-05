//再执行异步代码时，父函数已经不在内存堆栈中，所以无法冒泡，所以会作为全局异常抛出
//解决办法就是在异步代码执行时捕获异常并调用回调函数返回
function async(fn, callback) {
  // Code execution path breaks here.
  setTimeout(function ()　{
      try {
          callback(null, fn());
      } catch (err) {
          callback(err);
      }
  }, 0);
}

async(null, function (err, data) {
  if (err) {
      console.log('Error: %s', err.message);
  } else {
      // Do something.
  }
});
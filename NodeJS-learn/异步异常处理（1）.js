// 当代码块被 try { ... }包裹的时候，就表示这部分代码执行过程中可能会发生错误，一旦发生错误，就不再继续执行后续代码，转而跳到 catch块。 
// 错误也具有冒泡传播性 
// 如果在一个函数内部发生了错误，它自身没有捕获，错误就会被抛到外层调用函数，如果外层函数也没有捕获，该错误会一直沿着函数调用链向上抛出，
// 直到被JavaScript引擎捕获，代码终止执行。所以，我们不必在每一个函数内部捕获错误，只需要在合适的地方来个统一捕获，一网打尽：

// 当bar()函数传入参数null时，代码会报错，错误会向上抛给调用方foo()函数，foo()函数没有try ... catch语句，所以错误继续向上抛给调用方 main()函数，
// main()函数有try ... catch语句，所以错误最终在main()函数被处理了。 
// 至于在哪些地方捕获错误比较合适，需要视情况而定。

//但是当异步代码执行的时候，其父函数已经不存在，所以没办法捕获


function async(fn, callback) {
  // Code execution path breaks here.
  setTimeout(function ()　{
      callback(fn());
  }, 0);
}

try {
  async(null, function (data) {
      // Do something.
  });
} catch (err) {
  console.log('Error: %s', err.message);
}

// callback(fn());
// ^
// TypeError: fn is not a function
// at Timeout._onTimeout (c:\Users\lee\Desktop\myProject\NodeJS\异步异常处理（1）.js:4:16)
// at ontimeout (timers.js:436:11)
// at tryOnTimeout (timers.js:300:5)
// at listOnTimeout (timers.js:263:5)
// at Timer.processTimers (timers.js:223:10)

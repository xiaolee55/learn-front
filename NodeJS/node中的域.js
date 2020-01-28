// NodeJS提供了domain模块，可以简化异步代码的异常处理。在介绍该模块之前，我们需要首先理解“域”的概念。
// 简单的讲，一个域就是一个JS运行环境，在一个运行环境中，如果一个异常没有被捕获，将作为一个全局异常被抛出。

// NodeJS通过process对象提供了捕获全局异常的方法，示例代码如下
process.on('uncaughtException', function (err) {
  console.log('Error: %s', err.message);
});

setTimeout(function (fn) {
  fn();
});

//麻烦的回调判断
function async(request, callback) {
  // Do something.
  asyncA(request, function (err, data) {
      if (err) {
          callback(err);
      } else {
          // Do something
          asyncB(request, function (err, data) {
              if (err) {
                  callback(err);
              } else {
                  // Do something
                  asyncC(request, function (err, data) {
                      if (err) {
                          callback(err);
                      } else {
                          // Do something
                          callback(null, data);
                      }
                  });
              }
          });
      }
  });
}

http.createServer(function (request, response) {
  async(request, function (err, data) {
      if (err) {
          response.writeHead(500);
          response.end();
      } else {
          response.writeHead(200);
          response.end(data);
      }
  });
});
//可以在每处理一个请求时，使用domain模块创建一个子域（JS子运行环境）。在子域内运行的代码可以随意抛出异常，而这些异常可以通过子域对象的error事件统一捕获。
function async(request, callback) {
  // Do something.
  asyncA(request, function (data) {
      // Do something
      asyncB(request, function (data) {
          // Do something
          asyncC(request, function (data) {
              // Do something
              callback(data);
          });
      });
  });
}

http.createServer(function (request, response) {
  var d = domain.create();

  d.on('error', function () {
      response.writeHead(500);
      response.end();
  });

  d.run(function () {
      async(request, function (data) {
          response.writeHead(200);
          response.end(data);
      });
  });
});

// JS本身的throw..try..catch异常处理机制并不会导致内存泄漏，也不会让程序的执行结果出乎意料，但NodeJS并不是存粹的JS。
// NodeJS里大量的API内部是用C/C++实现的，因此NodeJS程序的运行过程中，
// 代码执行路径穿梭于JS引擎内部和外部，而JS的异常抛出机制可能会打断正常的代码执行流程，导致C/C++部分的代码表现异常，进而导致内存泄漏等问题。
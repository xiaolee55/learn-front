// HTTP请求在发送给服务器时，可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的。而http模块创建的HTTP服务器在接收到完整的请求头后，就会调用回调函数。
// 在回调函数中，除了可以使用request对象访问请求头数据外，还能把request对象当作一个只读数据流来访问请求体数据。
var http = require('http');
http.createServer(function (request, response) {
  var body = [];
  request.on('data', function (chunk) {
      body.push(chunk);
  });

  request.on('end', function () {
      body = Buffer.concat(body);
      console.log("有用户来了！");
      res.write('1234353');
      res.end();
  });
}).listen(8112);

// POST
// { 'user-agent': 'curl/7.26.0',
//   host: 'localhost',
//   accept: '*/*',
//   'content-length': '11',
//   'content-type': 'application/x-www-form-urlencoded' }
// Hello World
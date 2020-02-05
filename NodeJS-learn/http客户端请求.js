var http = require('http');

var options = {
  hostname: 'localhost',
  port: 8111,
  path: 'test1.js,test2.js',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  },
};

var request = http.request(options, function (response) {
  console.log(response)
});
request.end();
// http.get('http://127.0.0.1:8113', function (response) {
//   console.log("服务器返回数据为：",response)
// });
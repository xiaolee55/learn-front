const url = require("url")
var urlObj = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
console.log(urlObj)

//第二个参数为true时query字段是一个经过queryString模块转换后的参数对象
var urlObj2 = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash',true);
console.log(urlObj2)

//第三个参数为true时，可以正确解析不带协议头的URL，例如//www.example.com/foo/bar。

//format方法将URL对象转为字符串
url.format({
  protocol: 'http:',
  host: 'www.example.com',
  pathname: '/p/a/t/h',
  search: 'query=string'
});

//.resolve方法可以用于拼接URL
url.resolve('http://www.example.com/foo/bar', '../baz');
/* =>
http://www.example.com/baz
*/


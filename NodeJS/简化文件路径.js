var cache = {};
const path = require('path');
//path.normalize
//将传入的路径转换为标准路径，具体讲的话，除了解析路径中的.与..外，
//还能去掉多余的斜杠。如果有程序需要使用路径作为某些数据的索引，但又允许用户随意输入路径时，就需要使用该方法保证路径的唯一性
function store(key, value) {
    cache[path.normalize(key)] = value;
}

store('foo////bar', 4);
store('foo//baz//../bar', 2);
store('foo//baz//....////bar', 3);
console.log(cache);  // => { "foo/bar": 2 }

//path.join
//将传入的多个路径拼接为标准路径。该方法可避免手工拼接路径字符串的繁琐，并且能在不同系统下正确使用相应的路径分隔符。以下是一个例子：

console.log(  path.join('foo/', 'baz/', '../bar')) // => "foo/bar")


// path.extname
// 当我们需要根据不同文件扩展名做不同操作时，该方法就显得很好用。以下是一个例子：

  var ext = path.extname('foo/bar.js'); // => ".js"
  console.log(ext)
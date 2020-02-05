//用于大文件
var fs = require('fs');

function copy(src, dst) {
  //fs.createReadStream创建源文件的只读数据流
  //pipe将两个数据流连接起来，相当于让dst中的数据流入src中
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

console.log(process.argv)
main(process.argv.slice(2));
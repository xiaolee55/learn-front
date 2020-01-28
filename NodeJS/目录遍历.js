const fs = require('fs');
const path = require('path');
function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {   //读取目录文件
      var pathname = path.join(dir, file);    //拼接当前目录和当前文件

      if (fs.statSync(pathname).isDirectory()) {   //如果当前文件还是目录，则递归进入函数
          travel(pathname, callback);
      } else {
          callback(pathname);   //如果已经是文件，调用回调函数
      }
  });
}

travel('C:\\Users\\lee\\Desktop\\myProject',function(pathname) {
  //在函数回调中对文件做逻辑处理
  console.log(pathname)
})
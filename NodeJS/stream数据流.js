var pathname = "test1.js"
var fs = require('fs');
//只读数据流，只写数据流同理
var rs = fs.createReadStream(pathname);
// rs.on('data', function (chunk) {   //读取过程中会调用
//     console.log(chunk)
// });
function doa(chunk){
  setTimeout(()=>{
    console.log(chunk);
    rs.resume();
  },1000)
}
//回调版本，在doSomething完成之后才能继续读，在这之前则暂停读取
rs.on('data', function (chunk) {
  rs.pause();
  doa(chunk)
});

rs.on('end', function () { //读取完成会调用
    // cleanUp();
    console.log("输出完了") 
});


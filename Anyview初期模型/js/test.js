var http=require("http");
var querystring = require('querystring');
var util = require('util');
var server=http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"compile","Access-Control-Allow-Origin":"http://127.0.0.1:5500"});
    var post = '';     
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        console.log(post[0]);
        res.end(util.inspect(post));
    });
});
server.listen(13337,"localhost",function(){
    console.log("开始监听...");
});
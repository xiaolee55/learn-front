//导入http内置模块
const http=require('http')

//创建一个http服务器
const server=http.createServer()

//监听http服务器的request请求
server.on('request',function(req,res){
    const url=req.url

    if(url==='/getscript'){
        //拼接一个合法的JS脚本，这里拼接的是一个方法的调用
        var scriptStr='show()'
        //res.end发送个客户端，客户端去把这个字符串当做JS代码去解析执行
        res.end(scriptStr)
    }else{
        res.end('404')
    }
})

//指定端口号并启动服务器监听
server.listen(3000,function(){
    console.log('server listen at http://127.0.0.1:3000')
})
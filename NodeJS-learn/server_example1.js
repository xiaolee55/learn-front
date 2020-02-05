var fs = require('fs'),
    path = require('path'),
    http = require('http');

var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

function combineFiles(pathnames, callback) {  //合并函数，参数为路径名称和回调函数
    var output = [];

    (function next(i, len) {
        if (i < len) {
            fs.readFile(pathnames[i], function (err, data) {    //一个个文件读取，再合并在output中
                if (err) {
                    callback(err);
                } else {
                    output.push(data);   
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, Buffer.concat(output));      //将output中数组的值连接并返回
        }
    }(0, pathnames.length));
}

function main(argv) {       //主函数入口，参数为，命令行数组
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),  //将配置文件转回对象
        root = config.root || '.',
        port = config.port || 80;
    http.createServer(function (request, response) {            //开启服务器监听
        console.log("服务端已开启，正在等待连接")
        var urlInfo = parseURL(root, request.url);  //格式化url

        combineFiles(urlInfo.pathnames, function (err, data) {  //调用函数合并文件
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                response.end(data);
            }
        });
    }).listen(port);
}

function parseURL(root, url) {  //root是URL的公共部分，url是文件名组成的字符串
    var base, pathnames, parts;

    if (url.indexOf('??') === -1) {     //使用问号将公共部分与文件名分隔开
        url = url.replace('/', '/??');
    }
    parts = url.split('??');            //将文件名分在一个数组中，数组的第一位是'/'
    base = parts[0];
    pathnames = parts[1].split(',').map(function (value) {  //变成类似[ 'http:\\localhost\\test1.js\\test2.js' ]的格式
        return path.join(root, base, value);
    });
    console.log(pathnames)
    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    };
}
main(process.argv.slice(2));


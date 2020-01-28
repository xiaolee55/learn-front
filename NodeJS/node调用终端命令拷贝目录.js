var child_process = require('child_process');
var util = require('util');

//Linux下才能使用cp指令
function copy(source, target, callback) {
    child_process.exec(
        util.format('cp -r %s/* %s', source, target), callback);
}

copy('C:\\Users\\lee\\Desktop\\10月15~18号问题及解决情况汇总', 'C:\\Users\\lee\\Desktop\\10月15~18号问题及解决情况汇总\\new', function (err) {
    console.log("拷贝出错",err) 
});

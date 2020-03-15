// function parseParam(url) {
//   const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
//   const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
//   let paramsObj = {};
//   // 将 params 存到对象中
//   paramsArr.forEach(param => {
//     if (/=/.test(param)) { // 处理有 value 的参数
//       let [key, val] = param.split('='); // 分割 key 和 value
//       val = decodeURIComponent(val); // 解码
//       val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

//       if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
//         paramsObj[key] = [].concat(paramsObj[key], val);
//       } else { // 如果对象没有这个 key，创建 key 并设置值
//         paramsObj[key] = val;
//       }
//     } else { // 处理没有 value 的参数
//       paramsObj[param] = true;
//     }
//   })

//   return paramsObj;
// }

// url参数解析
function getUrlkey(url) {
  var params = {};
  var urls = url.split("?");                  console.log('1_分割url:', urls)
  var arr = urls[1].split("&");               console.log('2_分割urls[1]:', arr)
  for (var i = 0, l = arr.length; i < l; i++) {
    var a = arr[i].split("=");                console.log('3_遍历 arr 并分割后赋值给a:', a[0], a[1])
    params[a[0]] = a[1];                      console.log('4_a给params对象赋值:', params)
  }                                           console.log('5_结果:', params)
  return params;
}
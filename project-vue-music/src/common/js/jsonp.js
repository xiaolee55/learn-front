import originJsonp from 'jsonp'

//发送数据请求的文件
export default function jsonp(url, data, option) {
  //如果url有问号就要换成&
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  //异步处理返回Promise
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

//拼接data到URL上 ,data做一些格式处理
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}

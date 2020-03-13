const _new = function(func) {
  const o = Object.create(func.prototype) //1.继承构造函数的原型
  const k = func.call(o) //绑定this，让构造函数在新创建对象上运行
  if(typeof k === 'object') {  //判断构造函数的返回值是否为对象，有则直接返回该对象
    return k
  }else {
    return o
  }

} 








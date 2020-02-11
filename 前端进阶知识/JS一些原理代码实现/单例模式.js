//单例模式，一个类只有一个对象
//使用闭包实现
var Singleton = function(name) {
  this.name = name
}

Singleton.prototype.getName = function() {
  alert(this.name)
}

Singleton.getInstance = (function(name) {
  var instance
  return function(name) {
    if(!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()

var a = Singleton.getInstance("小明")
var b= Singleton.getInstance("小红")

console.log(a===b); //true

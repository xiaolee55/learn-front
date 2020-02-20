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


// // 单例构造函数
// function CreateSingleton (name) {
//   this.name = name;
//   this.getName();
// };

// // 获取实例的名字
// CreateSingleton.prototype.getName = function() {
//   console.log(this.name)
// };
// // 单例对象
// var Singleton = (function(){
//   var instance;
//   return function (name) {
//       if(!instance) {
//           instance = new CreateSingleton(name);
//       }
//       return instance;
//   }
// })();

// // 创建实例对象1
// var a = new Singleton('a');
// // 创建实例对象2
// var b = new Singleton('b');

// console.log(a===b);
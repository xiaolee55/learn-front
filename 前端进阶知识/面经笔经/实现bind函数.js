Function.prototype.myBind=function() {
  const args1 = [...arguments].slice(1)
  const context = arguments[0]||window
  const fun = this
  return function F() {
    if(this instanceof F){
      return new _this(...args1,...args2)
    }
    const args2 = [...arguments]
    console.log(fun,context)
    return fun.call(context,...args1.concat(args2))
  }
}

const obj = {
  a:1
}
function test(a) {
  console.log(a,this.name)
}

test.myBind(obj,1)()

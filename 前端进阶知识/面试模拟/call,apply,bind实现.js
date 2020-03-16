Function.prototype.myCall = function(context,...args){
  if(typeof this != "function"){
    throw new Error("error")
  }
  if(!context) context = window||global
  const fn = Symbol()
  context.fn = this
  const res = context.fn(...args)
  delete fn
  return res
}

Function.prototype.myApply = function(context,args){
  if(typeof this != "function"){
    throw new Error("error")
  }
  if(!context) context = window||global
  const fn = Symbol()
  context.fn = this
  const res = context.fn(...args)
  delete fn
  return res
}

Function.prototype.myBind = function(context,...args1){
  if(typeof this != "function"){
    throw new Error("error")
  } 
  const func = this
  return function a(...args2){
    if(func instanceof a){
      return new func(...args1,...args2)
    }
    func.call(context,...args1,...args2)
  }
}


const func = (function() {
  let a=0
  return function() {
    a++
    console.log(a)
  }
})()
 
 new func()
  
 new func()
  
 new func()
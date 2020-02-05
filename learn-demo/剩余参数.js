function sum(...rest){　　　　 　
  var sum = 0;　　　　 　
  for(var i = 0;i<rest.length; i++){　　　　　　 　　　
    sum += arguments[i];　　　　 　
  }　　 　
   return sum; 
}　　

console.log(sum(1,2,3,4))

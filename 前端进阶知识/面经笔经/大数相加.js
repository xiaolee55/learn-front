function bigNumAdd(num1,num2) {
  const res = []
  let flag=false
  num1=String(num1).split("");
  num2=String(num2).split("")
  while(num1.length||num2.length){
    let sum = add(num1.pop(),num2.pop())
    if(flag){
      sum = sum + 1
    }
    res.unshift(sum%10)
    if(res>=10){
      flag=true
    }else{
      flag=false
    }
  }
  if(flag){
    result.unshift("1")
  }
  return result.join("")
}

function add(a,b) {
  let l=0,r=0
  if(a){
    l=Number(a)
  }
  if(b){
    l=Number(b)
  }
  return l+r
}

console.log(bigNumAdd(12,12))
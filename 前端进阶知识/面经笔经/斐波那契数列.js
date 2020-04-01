function fibo(n) {
  let pre = 1,cur = 1,sum=0

  for(let i=2;i<n;i++){
    sum = pre+cur
    pre = cur
    cur = sum   
  }
  return sum
}

console.log(fibo(6))
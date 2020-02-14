//递归解法
function Fibonacci(n) {
  if(n<2){
    return n
  }
  return Fibonacci(n-1)+Fibonacci(n-2)
}

//动态规划解法
function Fibonacci(n) {
  if(n<=1){
    return n
  }
  let i = 1
  let pre = 0
  let current = 1
  let result = 0
  while(i++ < n){
    result = pre + current  //记录上两个值的和
    pre = current   //把上一个值往后推一个
    current = result //把当前值赋值为两个值的和
  }
}
//总体思路：双指针+窗口滑动。窗口的左右两边就是两个指针，我们根据窗口内值之和来确定窗口的位置和宽度。
function FindContinuousSequence(sum) {
  let result = []
  let plow = 1,phigh = 2
  while(plow<phigh) {
    let cur = (phigh+plow) * (phigh-plow+1) /2 //等差数列求和公式
    if(cur===sum){
      let list = []
      for(let i=plow;i<=phigh;i++) {
        list.push(i)
      }
      result.push(list)
      plow++
      phigh++
    }else if(cur<sum) {  //如果目前窗口内的总和小于目标值，则高位指针加一
      phigh++
    }else{           //如果目前的总和大于目标值，则低位指针加一，去掉最低位数
      plow++
    }
  }
  return result
}
function FindNumbersWithSum(array, sum) {
  if(array && array.length>0) {
    let left = 0
    let right = array.length - 1
    while(left<right) {
      const s = array[left] + array[right]
      if(s>sum) {
        right--
      }else if(s<sum){
        left++
      } else {
        return [array[left],array[right]]  //从外面向中间聚拢，最先找到的就是乘积最小的
      }
    }
  }
  return
}
function FindGreatestSumOfSubArray(array) {
  if(Array.isArray(array)&&array.length>0){
    let max = array[0]
    let sum = array[0]
    for (let i = 0; i < array.length; i++) {
      if(sum<0) sum=array[i]          //如果当前的和小于0，则他对未来的和没用贡献，因此把sum赋值给当前数
      else if(sum>0) sum+=array[i]    //如果sum>0，则继续累加
      if(sum>max) max = sum          //如果当前和大于最大数，则更新max
    }
    return max
  }
  return 0
}
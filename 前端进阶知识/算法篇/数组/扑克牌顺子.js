// 1.数组排序
// 2.遍历数组
// 3.若为0，记录0的个数加1
// 4.若不为0，记录和下一个元素的间隔
// 5.最后比较0的个数和间隔数，间隔数>0的个数则不能构成顺子
// 6.注意中间如果有两个元素相等则不能构成顺子

function IsContinuous(numbers) {
  if(numbers&&numbers.length>0) {
    numbers.sort()
    let zero = 0
    let per = 0
    for (let i = 0; i < numbers.length-1; i++) {
      if(numbers[i] == 0)
        zero++
      else if(numbers[i]==numbers[i+1])
        return false
      else 
        per+=(numbers[i+1]-numbers[i]-1)
    }
    if(per>zero) return false
    return true
  }
}

console.log(IsContinuous([0,0,3,4,5]));

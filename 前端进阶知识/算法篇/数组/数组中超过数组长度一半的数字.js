// 采用阵地攻守的思想：
// 第一个数字作为第一个士兵，守阵地；count = 1；
// 遇到相同元素，count++;
// 遇到不相同元素，即为敌人，同归于尽,count--；当遇到count为0的情况，又以新的i值作为守阵地的士兵，继续下去，到最后还留在阵地上的士兵，有可能是主元素。
// 再加一次循环，记录这个士兵的个数看是否大于数组一般即可。
function MoreThanHalfNum_Solution(numbers) {
  if(numbers&&numbers.length>=0) {
    let target = numbers[0]  //标记当前进行累计的是哪个数字
    let count = 1   //标记某个数字出现的次数
    for (let i = 0; i < numbers.length; i++) {
      if(numbers[i] == target){ //如果又有和target相同的值，则count累加1
        count++
      }else{  //否则count减一
        count--
      }
      if(target==0) {  
        target = numbers[i]
        count = 1
      }
    }
    count = 0
    for (let i = 0; i < numbers.length; i++) {
      if(numbers[i]==target)   //留到最后的就是出现次数最多的数字，判断其出现次数是否大于数组的一半
        count++
    }
    return count>numbers.length/2?target:0
  } 
}
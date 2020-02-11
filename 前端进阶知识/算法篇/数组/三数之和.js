//遍历数组，每碰到一个数就设置两个指针向中间靠拢，判断和是否为0，需要注意的是遇到重复数字需要跳过（该数字已被计算的情况下） 
var threeSum = function(nums) {
  const result = []
  nums.sort((a,b) => a - b)   //先对数组进行排序
  for (let i = 0; i < nums.length; i++) {
    //跳过重复数字
    if(i&&nums[i] === nums[i-1]) continue   //如果和上一个数据相同，则跳过它，因为它对应的查找上一个数字已经查询过
    
    let left = i+1
    let right = nums.length - 1
    while(left<right) {
      const sum = nums[i] + nums[left] + nums[right]
      if(sum>0) {   //如果和大于0，则右指针向前靠拢
        right--
      }else if(sum<0){  //如果和小于0，则左指针向后靠拢
        left++
      }else{  //如果相等，则加入结果数组
        result.push([nums[i],nums[left++],nums[right--]])
        //跳过重复数字
        while(nums[left] === nums[left-1]) {
          left++
        }
        //跳过重复数字
        while (nums[right] === nums[right + 1]) {
          right--;
        }
      }
    }
  }
  return result;
}

const nums = [-1, 0, 1, 2, -1, -4]
console.log(threeSum(nums));

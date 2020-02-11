var fourSum = function (nums, target) {
  if (nums.length < 4) {   //数组长度不满四个，则返回空数组
      return [];
  }
  nums.sort((a, b) => a - b);   //对数组进行排序
  const result = [];
  for (let i = 0; i < nums.length - 3; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) {   //如果该数字和其上一个数字相同，则跳过
          continue;
      }
      if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) { 
         //如果该数字及其后面的三个数字加起来和大于目标值，则说明后面的都大于目标值，直接退出
          break;
      }
      for (let j = i + 1; j < nums.length - 2; j++) {
          if (j > i + 1 && nums[j] === nums[j - 1]) { //如果该数字和其上一个数字相同，则跳过
              continue;
          }
          let left = j + 1,
              right = nums.length - 1;
          while (left < right) {
              const sum = nums[i] + nums[j] + nums[left] + nums[right];
              if (sum === target) {
                  result.push([nums[i], nums[j], nums[left], nums[right]]);
              }
              if (sum <= target) {
                  while (nums[left] === nums[++left]);
              } else {
                  while (nums[right] === nums[--right]);
              }
          }
      }
  }
  return result;
};
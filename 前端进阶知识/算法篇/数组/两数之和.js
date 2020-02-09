
// 使用一个map将遍历过的数字存起来，值作为key，下标作为值。

// 对于每一次遍历：

// 取map中查找是否有key为target-nums[i]的值
// 如果取到了，则条件成立，返回。
// 如果没有取到，将当前值作为key，下标作为值存入map

//这种做法返回的是乘积最大的两个数
var twoSum = function (nums, target) {
  const map = {};
  if (Array.isArray(nums)) {
    for (let i = 0; i < nums.length; i++) {
      if (map[target - nums[i]] != undefined) {
        return [map[target - nums[i]], i];
      } else {
        map[nums[i]] = i;
      }
    }
  }
  return [];
};
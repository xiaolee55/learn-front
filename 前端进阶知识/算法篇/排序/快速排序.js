// 记录一个索引l从数组最左侧开始，记录一个索引r从数组右侧开始
// 在l<r的条件下，找到右侧小于target的值array[r]，并将其赋值到array[l]
// 在l<r的条件下，找到左侧大于target的值array[l]，并将其赋值到array[r]
// 这样让l=r时，左侧的值全部小于target，右侧的值全部小于target，将target放到该位置
// 不需要额外存储空间，写法思路稍复杂

// 复杂度
// 时间复杂度：平均O(nlogn)，最坏O(n2)，实际上大多数情况下小于O(nlogn)

// 空间复杂度:O(logn)（递归调用消耗）

// #稳定性
function quickSort(array, start, end) {
  if (end - start < 1) {
    return;
  }
  const target = array[start];
  let l = start;
  let r = end;
  while (l < r) {  //首次进入的时候与后面的进入不同
    while (l < r && array[r] >= target) {  //找到右边小于target的值
      r--;
    }
    array[l] = array[r];   //首次l的值即为target的值，所以覆盖也没关系
    while (l < r && array[l] < target) {   //找到左边大于target的值
      l++;
    }
    array[r] = array[l];
  }
  array[l] = target;    //一趟交换完成后l的值就是中间值了
  quickSort(array, start, l - 1);
  quickSort(array, l + 1, end);
  return array;
}

console.log( quickSort([1,434,54,23,65],0,4))

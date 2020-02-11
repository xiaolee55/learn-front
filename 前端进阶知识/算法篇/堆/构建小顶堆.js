// 从第一个非叶子节点开始依次对数组中的元素进行下沉操作

// 和孩子节点的最小值min比较
// 小于min — 不需要在下沉
// 大于min — 和min交换位置（下沉） - 继续和下一层孩子节点比较，直到队列末尾
function ajustMinHeap(array, index, length) {
  for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
    if (i + 1 < length && array[i + 1] < array[i]) {
      i++;
    }
    if (array[index] < [array[i]]) {
      break;
    } else {
      [array[index], array[i]] = [array[i], array[index]];
      index = i;
    }
  }
}

function createMinHeap(arr, length) {
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    ajustMinHeap(arr, i, length);
  }
  return arr;
}
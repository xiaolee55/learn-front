// 创建一个大顶堆，大顶堆的堆顶一定是最大的元素。

// 交换第一个元素和最后一个元素，让剩余的元素继续调整为大顶堆。

// 从后往前以此和第一个元素交换并重新构建，排序完成。

// 时间复杂度：O(nlogn)

// 空间复杂度:O(1)

// #稳定性
// 不稳定

function heapSort(array) {
  creatHeap(array);  //先建立一个大顶堆
  // 交换第一个和最后一个元素，然后重新调整大顶堆
  for (let i = array.length - 1; i > 0; i--) {   //从数组最后一个元素开始和堆顶做交换
    [array[i], array[0]] = [array[0], array[i]];
    adjust(array, 0, i);
  }
  return array;
}
// 构建大顶堆，从第一个非叶子节点开始，进行下沉操作
function creatHeap(array) {
  const len = array.length;
  const start = parseInt(len / 2) - 1;
  for (let i = start; i >= 0; i--) {
    adjust(array, i, len);
  }
}
// 将第target个元素进行下沉，孩子节点有比他大的就下沉
function adjust(array, target, len) {
  for (let i = 2 * target + 1; i < len; i = 2 * i + 1) { //2*target+1表示左节点
    // 找到孩子节点中最大的
    if (i + 1 < len && array[i + 1] > array[i]) {
      i = i + 1;
    }
    // 下沉
    if (array[i] > array[target]) {  //如果子节点大于父节点，则进行交换，并继续比较子节点
      [array[i], array[target]] = [array[target], array[i]]
      target = i;
    } else {
      break;
    }
  }
}

console.log(heapSort([1,3,4,5,2,9,4,5,6]));
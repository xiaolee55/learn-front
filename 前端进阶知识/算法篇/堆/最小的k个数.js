// 1.把前k个数构建一个大顶堆

// 2.从第k个数开始，和大顶堆的最大值进行比较，若比最大值小，交换两个数的位置，重新构建大顶堆

// 3.一次遍历之后大顶堆里的数就是整个数据里最小的k个数。

function GetLeastNumbers_Solution(input, k) {
  if (k > input.length) {
    return [];
  }
  createHeap(input, k);   //前K个数构建大顶堆
  for (let i = k; i < input.length; i++) {  //第K个数开始和堆顶相比，小于则交换堆顶和该数，并重新建立堆
    // 当前值比最小的k个值中的最大值小
    if (input[i] < input[0]) {
      [input[i], input[0]] = [input[0], input[i]];
      ajustHeap(input, 0, k);   //交换后重新调整堆
    }
  }
  return input.splice(0, k);
}

// 构建大顶堆
function createHeap(arr, length) {
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {   //从第一个非叶子节点开始进行
    ajustHeap(arr, i, length);
  }
}

function ajustHeap(arr, index, length) {
  for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
    if (i + 1 < length && arr[i + 1] > arr[i]) {
      i++;
    }
    if (arr[index] < arr[i]) {
      [arr[index], arr[i]] = [arr[i], arr[index]];
      index = i;
    } else {
      break;
    }
  }
}
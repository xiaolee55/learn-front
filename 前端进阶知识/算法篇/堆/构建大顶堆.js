// 和孩子节点的最大值max比较
// 大于max — 不需要在下沉
// 小于max — 和max交换位置 - 继续和下一层孩子节点比较，直到队列末尾

function adjustMaxHeap(array, index, length) {
  for (let i = 2*index+1; index < length; i=2*i+1) {
    if(i+1<length && array[i+1]>array[i]) {  //获取子节点中较大的数
      i++
    }
    if(array[index]>=array[i]) {  //如果根节点最大，则当前节点比较结束
      break
    }else{ //解构赋值进行交换
      [array[index],array[i]] = [array[i],array[index]]
      index = i   //继续和下一个节点进行交换
    }
  }
}

function createMaxHeap(arr, length) {
  for (let i = Math.floor(length/2)-1; i>=0; i--) { //从第一个非叶子结点开始下沉
    adjustMaxHeap(arr, i, length);
  }
  return arr
}

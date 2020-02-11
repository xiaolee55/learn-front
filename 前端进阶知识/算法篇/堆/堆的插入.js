//先将元素插入再调整堆
function minHeapAdd(array = [], element) {
  array.push(element);
  if (array.length > 1) {
    let index = array.length - 1;
    let target = Math.floor((index - 1) / 2);   //拿到其父结点
    while (target >= 0) { 
      if (array[index] < array[target]) {  //不符合要求则进行交换
        [array[index], array[target]] = [array[target], array[index]]
        index = target;   //继续冒泡交换
        target = Math.floor((index - 1) / 2);
      } else {
        break;
      }
    }
  }
  return array;
}
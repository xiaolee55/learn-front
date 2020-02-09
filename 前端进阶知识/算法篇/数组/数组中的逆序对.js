function mergeInversePairs(arr, copy, begin, end) {
  if(begin === end) {
      return 0;
  }
  var mid = begin + end >> 1;
  var left = mergeInversePairs(arr, copy, begin, mid);
  var right = mergeInversePairs(arr, copy, mid + 1, end);
  var num = 0, i = mid, j = end, k = end;
  while(i >= begin && j >= mid + 1) {  //合并阶段，从数组末尾开始
      if(arr[i] <= arr[j]) {   //如果左数组的值小于右数组的值，则直接放入copy数组中，相当于排序
          copy[k--] = arr[j--];
      } else {            //否则的话就形成了逆序对，左数组的i位置的值大于右数组j左边的所有值，则num+=j-mid
          num += j - mid;
          copy[k--] = arr[i--];
      }
  }
  //各自还有剩余的没比完，直接赋值即可
  while(i >= begin) copy[k--] = arr[i--];   
  while(j >= mid + 1) copy[k--] = arr[j--];
  //copy数组覆盖原数组
  for(var s = begin; s <= end; s++)
  {
      arr[s] = copy[s];
  }
  return num + left + right;
}
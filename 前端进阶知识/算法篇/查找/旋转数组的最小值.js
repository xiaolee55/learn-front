// 旋转数组其实是由两个有序数组拼接而成的，因此我们可以使用二分法，只需要找到拼接点即可。
//从被旋数组较长和被旋数组较短去思考
function minNumberInRotateArray(array) {
  var low = 0
  var high = array.length - 1
  while(low<high) {
    var mid = Math.floor(low+(high-low)/2)
    if(array[mid]>array[high]) {   //出现了中间值小于高位值的情况，说明中间值在第一段数组中，则在右边寻找
      low = mid + 1
    }else if(array[mid] === array[high]) { //中间值等于最高位值，则无法判断在左还是在右，只能一位一位的找
      high = high - 1
    }else{   //如果中间值小于高位值，则说明最小值为中间值或者在左边
      high = mid
    }
  }
  return array[mid]
}
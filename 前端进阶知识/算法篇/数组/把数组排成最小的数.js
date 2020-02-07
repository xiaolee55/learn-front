// 定义一种新的排序规则，将整个数组重新排序：

// a和b两个数字可以有两种组合：ab和ba，若ab<ba则ab应该排在ba前面，否则ab应该排在ba后面。

function PrintMinNumber(numbers) {
  if(!numbers || numbers.length === 0) {
    return ''
  }
  return numbers.sort(compare).join('')
}

//任意连接两个数组合并选出小的进行排序
function compare(a,b) {
  const front = "" + a + b
  const behind = "" + b + a
  return front - behind
}

console.log(PrintMinNumber([14,13,344]))
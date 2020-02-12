// 使用回溯法

// 记录一个字符（temp），用于存储当前需要进入排列的字符

// 记录一个字符串（current），用于记录当前已经排列好的字符

// 记录一个队列（queue），用于存储还未被排列的字符

// 每次排列将temp添加到current
// 如果queue为空，则本次排列完成，将current加入到结果数组中，结束递归
// 如果queue不为空，说明还有未排列的字符
// 递归排列queue中剩余的字符
// 为了不影响后续排列，每次递归完成，将当前递归的字符temp加回队列

function Permutation(str) {
  const result = []
  if(str) {
    queue = str.split('')
    PermutationCore(queue,result)
  }
  result.sort()
  return [...new Set(result)]
}

function PermutationCore(queue,result,temp="",current="") {
  current += temp
  if(queue.length === 0) {
    result.push(current)
    return
  }
  for (let i = 0; i < queue.length; i++) {
    temp = queue.shift() //从字符串的头开始
    PermutationCore(queue,result,temp,current)
    queue.push(temp)
  }
}

console.log(Permutation("abc"))
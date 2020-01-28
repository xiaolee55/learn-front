//递归版本
function middleOrderTraversalRe(root,arr) { //数组是引用类型，所以每轮递归的值都是同一个
  if(root) {
    middleOrderTraversal(root.left,arr)
    arr.push(root.val)
    middleOrderTraversal(root.right,arr)
  }
  return arr
}

//非递归版本
// 取跟节点为目标节点，开始遍历
// 1.左孩子入栈 -> 直至左孩子为空的节点
// 2.节点出栈 -> 访问该节点
// 3.以右孩子为目标节点，再依次执行1、2、3
function middleOrderTraversal(root) {
  const result = []
  const stack = []
  let current = root
  while(current||stack.length){
    while(current) {   
      stack.push(current)
      current=current.left
    }
    current = stack.pop()
    result.push(current.val)
    current = current.right
  }
}
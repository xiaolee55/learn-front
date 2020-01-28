//递归版本
function preOrderTraversalRe(root,arr) { //数组是引用类型，所以每轮递归的值都是同一个
  if(root) {
    arr.push(root.val)
    preOrderTraversal(root.left,arr)
    preOrderTraversal(root.right,arr)
  }
  return arr
}

//非递归版本
// 取根节点为目标节点，开始遍历
// 1.访问目标节点
// 2.左孩子入栈 -> 直至左孩子为空的节点
// 3.节点出栈，以右孩子为目标节点，再依次执行1、2、3
function preOrderTraversal(root) {
  const result = []
  const stack = []
  let current = root
  while(current||stack.length>0) {
    while(current) {  //先将左孩子全部入栈
      result.push(current.val)
      stack.push(current)
      current=current.left
    }
    current = stack.pop() //节点出栈
    current = current.right //右孩子作为目标结点继续执行
  }
  return result
}

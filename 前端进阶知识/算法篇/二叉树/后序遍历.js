//递归版本
function laterOrderTraversalRe(root,arr) { //数组是引用类型，所以每轮递归的值都是同一个
  if(root) {
    middleOrderTraversal(root.left,arr)
    middleOrderTraversal(root.right,arr)
    arr.push(root.val)
  }
  return arr
}

//非递归版本
// 取根节点为目标节点，开始遍历
// 1.左孩子入栈 -> 直至左孩子为空的节点
// 2.栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
// 3.栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3
function laterOrderTraversal(root) {
  const result = []
  const stack = []
  let current = root
  let last = null; // 标记上一个访问的节点
  while(current||stack.length) {  //先将左孩子全部入栈，直至左孩子为空
    while(current) {
      stack.push(current)
      current=current.left
    }
    current = stack[stack.length-1]  //取得栈顶元素
    if(!current.right || current.right == last) {  //如果该结点没有右结点或者右结点已经被访问过，则访问他并出栈
      current = stack.pop() 
      result.push(current.val)
      last = current
      current = null //继续弹栈
    } else {
      current = current.right
    }
  }
  return result
}
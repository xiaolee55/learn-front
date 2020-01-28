function isSymmetrical(pRoot) {
  return isSymmetrical(pRoot,pRoot)
}

function isSymmetricalTree(node1,node2) {
  if(!node1&&!node2) {   //如果两个节点都为空，说明已经遍历完成，前面全部相等
    return true
  }
  if(!node1||!node2) {  //如果一边有结点另一边没有，则说明不对称
    return false
  }
  if(node1.val != node2.val) {  //两边结点的值不相等，则也不对称
    return false
  }
  return isSymmetricalTree(node1.left,node2.right) && isSymmetricalTree(node1.right, node2.left);
}
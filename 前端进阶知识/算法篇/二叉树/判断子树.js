function HasSubtree(pRoot1, pRoot2) {   //先找到和PRoot2根节点相同的子结构
  let result = false
  if(pRoot1&&pRoot2){  //两棵树都不能为空
    if(pRoot1.val === pRoot2.val) {
      result = compare(pRoot1,pRoot2)
    }
    if(!result) {  
      result = HasSubtree(pRoot1.right,pRoot2)
    }
    if(!result) {
      result = HasSubtree(pRoot1.left,pRoot2)
    }
  }
  return result
}

function compare(pRoot1,pRoot2) {   //根节点相同的子结构进行递归对比
  if(pRoot2 === null) {   //tree2遍历完了都对应的上，则返回true
    return true
  }
  if(pRoot1 === null) {   //tree2不为空tree1为空，则返回false
    return false
  }
  if(pRoot1.val !== pRoot2.val){  //结点值不相等
    return false
  }
  return compare(pRoot1.right,pRoot2.right) && compare(pRoot1.left,pRoot2.left)
}
function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
} 

function reConstructBinaryTree(pre, vin) {
  if(pre.length === 0){
      return null;
  }
  if(pre.length === 1){
      return new TreeNode(pre[0]);
  }
  const value = pre[0];   //拿到先序遍历的第一个节点，即根节点
  const index = vin.indexOf(value);   //拿到根节点在中序遍历数组中的位置
  const vinLeft = vin.slice(0,index);   //拿到左子树的所有元素
  const vinRight = vin.slice(index+1);   //拿到右子树的全部元素
  const preLeft = pre.slice(1,index+1);   //拿到先序遍历中左子树的全部元素
  const preRight = pre.slice(index+1);   //拿到先序遍历中右子树的全部元素
  const node = new TreeNode(value);     //构造根节点
  node.left = reConstructBinaryTree(preLeft, vinLeft);  //构造左子树
  node.right = reConstructBinaryTree(preRight, vinRight);  //构造右子树
  return node;
}
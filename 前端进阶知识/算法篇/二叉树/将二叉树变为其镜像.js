
function Mirror(root) {
  if(root){
    //交换左右节点
    let tmp = root.right
    root.right=root.left
    root.left=tmp
    Mirror(root.right)   //将根节点的右子树的所有结点交换
    Mirror(root.left)   //将根节点的左子树的所有结点交换
  }
}
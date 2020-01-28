function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
} 
function reConstructBinaryTree(pre, vin)
{
  let tree = new TreeNode(pre[0])
  let _vin1 = vin.slice(0,vin.indexOf(pre[0]))
  let _vin2 = vin.slice(vin.indexOf(pre[0])+1)
  let _pre1 = pre.slice(1,_vin1.length+1)
  let _pre2 = pre.slice(_vin1.length+1)
  tree.left = reConstructBinaryTree(_pre1,_vin1)
  tree.right = reConstructBinaryTree(_pre2,_vin2)
  // write code here
  return tree
}
const a= reConstructBinaryTree([1,2,4,7,3,5,6,8],[4,7,2,1,5,3,8,6])
console.log(a)
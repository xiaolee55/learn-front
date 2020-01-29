function Node(data,left,right) {
  this.data = data
  this.left = left
  this.right = right
}
function TreeDepth(pRoot) {
  return !pRoot ? 0 : Math.max(TreeDepth(pRoot.left), TreeDepth(pRoot.right)) + 1
}

let left = new Node(2,null,null)
let right = new Node(3,null,null)
let root = new Node(1,left,right)
console.log(TreeDepth(root))
// function TreeDepth(pRoot) {
//   return !pRoot ? 0 : Math.max(TreeDepth(pRoot.left), TreeDepth(pRoot.right)) + 1
// }
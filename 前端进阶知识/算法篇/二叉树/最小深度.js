function Node(data,left,right) {
  this.data = data
  this.left = left
  this.right = right
}
var minDepth = function (root) {
  if(!root) {
    return 0
  }
  if(!root.left) {
    return 1 + minDepth(root.right)
  }
  if(!root.right) {
    return 1 + minDepth(root.left)
  }
  return Math.min(minDepth(root.left),minDepth(root.right)) + 1
}

let right = new Node(3,null,null)
let left = new Node(2,right,null)
let root = new Node(1,left,null)
console.log(minDepth(root))
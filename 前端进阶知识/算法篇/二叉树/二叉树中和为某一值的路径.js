const treeNode = require('./treeNode.js')

//非递归方法
// function valuePath(root,num) {
//   const result = []
//   const stack = []
//   let sum = 0
//   while(root||stack.length>0) {
//     while(root) {
//       sum+=root.value
//       stack.push(root)
//       root = root.left
//     }
//     if(sum == num) {
//       result.push(stack)
//     }
//     sum = 0
//     root = stack.pop()
//     root=root.right
//   }
//   return result
// }

// 套用回溯算法的思路

// 设定一个结果数组result来存储所有符合条件的路径

// 设定一个栈stack来存储当前路径中的节点

// 设定一个和sum来标识当前路径之和

// 从根结点开始深度优先遍历，每经过一个节点，将节点入栈

// 到达叶子节点，且当前路径之和等于给定目标值，则找到一个可行的解决方案，将其加入结果数组

// 遍历到二叉树的某个节点时有2个可能的选项，选择前往左子树或右子树

// 若存在左子树，继续向左子树递归

// 若存在右子树，继续向右子树递归

// 若上述条件均不满足，或已经遍历过，将当前节点出栈，向上回溯
function FindPath(root,expectNumber) {
  const result = []
  if(root) {
    FindPathCore(root,expectNumber,[],0,result)
  }
  return result
}

function FindPathCore(node,expectNumber,stack,sum,result) {
  stack.push(node.val)
  sum += node.val
  if(!node.left && !node.right && sum === expectNumber) {  //当前节点已经是叶子结点且sum=期待值
    result.push(stack.slice(0))
  }
  if(node.left) {    //如果还存在左节点，则继续递归
    FindPathCore(node.left, expectNumber, stack, sum, result);
  }
  if(node.right) {   //如果还存在右节点，则继续递归
    FindPathCore(node.right, expectNumber, stack, sum, result);
  }
  stack.pop()
}

let a = new treeNode(1)
let b = new treeNode(2)
let c = new treeNode(3)
a.left = b
a.right = c

console.log(valuePath(a,3));


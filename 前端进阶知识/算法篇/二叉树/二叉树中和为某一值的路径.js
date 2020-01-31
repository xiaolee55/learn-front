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
    FindPathCore(root,expectNumber,[],result)
  }
  return result
}

function FindPathCore(root,expectNumber,stack,result) {
  stack.push(root.value);  //把当前结点的值入栈
  if(root.value == expectNumber && root.left==null && root.right==null){ //叶子结点，且值为exceptNumber减去前面的最后一个值
    result.push(stack.slice());   //slice是对数组的浅拷贝，不加slice的话相当于将栈的指针push进path，导致stack的变化会影响path
  }
  if(root.left!=null){
    FindPathCore(root.left,expectNumber-root.value,stack,result);
  }
  if(root.right!=null){
    FindPathCore(root.right,expectNumber-root.value,stack,result);
  }
  stack.pop();   //把当前结点的值出栈，回溯
}

let a = new treeNode(1)
let b = new treeNode(2)
let c = new treeNode(3)
a.left = b
a.right = c

console.log(FindPath(a,3));


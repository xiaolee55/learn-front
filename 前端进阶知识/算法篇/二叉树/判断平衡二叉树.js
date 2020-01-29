// 后续遍历二叉树

// 在遍历二叉树每个节点前都会遍历其左右子树

// 比较左右子树的深度，若差值大于1 则返回一个标记 -1表示当前子树不平衡

// 左右子树有一个不是平衡的，或左右子树差值大于1，则整课树不平衡

// 若左右子树平衡，返回当前树的深度（左右子树的深度最大值+1）


//个人感悟：要学会思想分解，比如本题中，就是在计算二叉树深度的基础
//上增加一个对树是否平衡的判断，而判断依据就是左子树平衡且右子树平衡且两颗子树深度只差绝对值小于1
function IsBalanced_Solution(pRoot) {
  return balanced(pRoot) != -1
}

function balanced(root) {
  if(!root) return 0
  left=balanced(root.left)
  right=balanced(root.right)
  if(left == -1 || right == -1||Math.abs(left-right)>1)
    return -1
  return Math.max(left,right)+1
}
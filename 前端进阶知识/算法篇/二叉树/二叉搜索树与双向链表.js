/*整体思路:
1.先将左子树转为双向链表
2.定义一个指针走到链表尾部，将左子树形成的双向链表与根节点相连
3.将右子树转为双向链表，再与根节点双向相连（根节点的右指针指向右链表，右链表的左指针指向根节点）。
上面三步采用递归方式*/
function Convert(pRootOfTree) {
  if (!pRootOfTree) {
    return null;
  }
  ConvertCore(pRootOfTree);
  while (pRootOfTree.left) {
    pRootOfTree = pRootOfTree.left;
  }
  return pRootOfTree;
}


function ConvertCore(node, last) {
  if (node.left) {   //找到链表的最后一个结点,即左子树的最后一个结点
    last = ConvertCore(node.left, last)
  }

  node.left = last;  //将当前节点和链表尾部进行左连接
  if (last) {          
    last.right = node;   //将当前链表尾部结点和当前节点进行右连接，这样当前节点就成为了已完成链表的最后一个结点
  }
  last = node;     //当前节点变为链表的最后一个结点
  
  if (node.right) {
    last = ConvertCore(node.right, last);
  }
  return last;
}
function GetNext(pNode)
{
  if(pNode==null)
      return null
  if(pNode.right!=null){  //1.结点有右子树，则节点的右子树的最左边的节点即为下一个节点
      pNode=pNode.right
      while(pNode.left!=null){
          pNode=pNode.left
      }
      return pNode
  }else if(pNode.next!=null&&pNode.next.left==pNode){ // 2.节点无右子树且该节点为父节点的左子节点
      return pNode.next
  }else if (pNode.next != null && pNode.next .right == pNode) { 
      // 3.节点无右子树且该节点为父节点的右子节点，则一直向上查找，直到找到符合条件2的节点，然后按2的流程走，否则说明该节点已经是最后的节点
      while(pNode.next != null && pNode .next .left != pNode){
           pNode = pNode.next ;
      }
     return pNode.next ;
  }else{//4.节点无父节点 ，即节点为根节点且无右子树
       return pNode.next ;
  }
}
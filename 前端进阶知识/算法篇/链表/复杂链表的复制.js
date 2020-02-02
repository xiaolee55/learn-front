class Node {
  constructor(label,next=null,random=null) {
    this.label = label
    this.next = next
    this.random = random
  }
}
//递归法
function CloneLink(pHead)
{
    if(!pHead){
        return null;
    }
    var CloneHead=new Node(pHead.label);
    CloneHead.label=pHead.label;
    CloneHead.random=pHead.random;
     
    CloneHead.next=Clone(pHead.next);
    return CloneHead;
}

// 非递归法
// 1.复制一份链表放在前一个节点后面，即根据原始链表的每个节点N创建N,把N直接放在N的next位置，让复制后的链表和原始链表组成新的链表。

// 2.给复制的链表random赋值，即N.random=N.random.next。

// 3.拆分链表，将N`和N进行拆分，保证原始链表不受影响
function Clone(pHead) {
  if(pHead === null) {
    return null
  }
  cloneNodes(pHead)
  cloneRandom(pHead)
  return reconnectNodes(pHead)
}
//克隆链表每个结点并插到各个结点之后
function cloneNodes(pHead) {
  var current = pHead
  while(current) {
    var cloneNode = new Node(pHead.label,pHead.next)
    current.next = cloneNode
    current = cloneNode.next
  }
}

//克隆每个结点的random指针
function cloneRandom(pHead) {
  var current = pHead
  while(current) {
    var cloneNode = current.next
    if(current.random) {
      cloneNode.random = current.random.next
    } else {
      cloneNode.random = null
    }
    current = cloneNode.next
  }
}

//拆分新链表
function reconnectNodes(pHead) {
  var cloneHead = pHead.next
  var cloneNode = pHead.next
  var current = pHead
  while(current) {
    current.next = cloneNode.next
    current = cloneNode.next
    if(current) {
      cloneNode.next = current.next
      cloneNode = current.next
    } else {
      cloneNode.next = null
    }
  }
  return cloneHead
}

let a=new Node(2)
let b=new Node(3)
let c=new Node(4)
let d=new Node(5)
a.next=b
b.next=c
c.next=d
console.log(Clone(a))
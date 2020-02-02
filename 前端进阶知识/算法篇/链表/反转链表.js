let LinkNode = require('./LinkList.js')

function reverseLink(head) {
  let new_head = null
  while(head) {
    let next = head.next   //备份链表的下一个节点
    head.next = new_head   //更新head.next
    new_head = head   //移动new_head到链表头
    head = next   //遍历链表
  }
  return new_head
}

let a=new LinkNode(2)
let b=new LinkNode(3)
let c=new LinkNode(4)
let d=new LinkNode(5)
a.next=b
b.next=c
c.next=d

console.log(reverseLink(a));
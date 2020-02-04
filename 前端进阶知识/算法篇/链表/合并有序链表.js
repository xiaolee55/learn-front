let LinkNode = require('./LinkList.js')
function mergeOrderList(head1,head2) {
  let p1=head1,p2=head2
  let current,head
  head=current= new LinkNode(null)

  while(p1&&p2) {
    if(p1.val<p2.val) {
      current.next = p1
      p1 = p1.next
    }else {
      current.next = p2
      p2 = p2.next
    }
    current = current.next
  }
  if(!p1&&p2) {
    current.next = p2
  }
  if(p1&&!p2) {
    current.next = p1
  }
  return head.next
}

let head1=new LinkNode(2)
let b=new LinkNode(3)
let c=new LinkNode(4)
let d=new LinkNode(5)
head1.next=b
b.next=c
c.next=d

let head2=new LinkNode(1)
let e=new LinkNode(6)
let f=new LinkNode(7)
let g=new LinkNode(8)
head2.next=e
e.next=f
f.next=g

console.log(mergeOrderList(head1,head2));
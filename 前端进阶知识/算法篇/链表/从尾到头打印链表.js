let LinkNode = require('./LinkList.js')
function printListFromTailToHead(head)
{
    const array = [];
    while(head){
        array.unshift(head.val);
        head = head.next;
    }
    return array;
}

let a=new LinkNode(2)
let b=new LinkNode(3)
let c=new LinkNode(4)
let d=new LinkNode(5)
a.next=b
b.next=c
c.next=d

console.log(printListFromTailToHead(a));


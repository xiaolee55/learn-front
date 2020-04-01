function ListNode(val) {
    this.val = val;
    this.next = null;
}

var addTwoNumbers = function(l1, l2) {
  let arr = []
  let pre = 0
  while(l1 && l2) {
      let cur = pre + l1.val + l2.val
      if(cur>=10){
          pre = cur/10
          cur%=10
      }
      else {
          pre = 0
      }
      arr.push(cur)
      l1=l1.next
      l2=l2.next
  }
  let l = new ListNode(null)
  let p=l
  for(let i=0;i<arr.length;i++){
      let node = new ListNode(arr[i])
      p.next = node
      p=p.next
  }
  return l.next
};

let a = new ListNode(2)
let b = new ListNode(4)
let c = new ListNode(3)

let d = new ListNode(5)
let e = new ListNode(6)
let f = new ListNode(4)

a.next=b
b.next=c

d.next=e
e.next=f

addTwoNumbers(a,d)





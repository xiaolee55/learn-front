
function deleteDuplication(pHead) {
  let pre,last
  let head = new Node(null)
  head.next = pHead
  pre = head
  last = head.next
  while(last) {
    if(last.next&&last.val == last.next.val) {  //找出全部重复的元素并删除
      while(last.next&&last.next.val==last.val) {
        last = last.next
      }
      pre.next = last.next
    }else{
      pre = pre.next
    }
    last = last.next
  }
  return head.next
}
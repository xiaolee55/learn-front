//长链表先走一段
function FindFirstCommonNode(pHead1, pHead2) {
  if (!pHead1 || !pHead2) { return null; }
  const len1=0,len2=0,p1=pHead1,p2=pHead2
  while(p1) {
    p1=p1.next
    len1++
  }
  while(p2) {
    p2=p2.next
    len2++
  }
  let num=len1-len2
  if(num>0){
    while(num>0) {
      pHead1 = pHead1.next
      num--
    }
  }else{
    while(num<0) {
      pHead2 = pHead2.next
      num++
    }
  }
  while(pHead2!=pHead2) {
    pHead1 = pHead1.next
    pHead2 = pHead2.next
  }
  return pHead2
}
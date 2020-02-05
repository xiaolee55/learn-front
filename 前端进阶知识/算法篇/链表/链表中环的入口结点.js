
function findCycle(pHead) {
  if (!pHead || !pHead.next) {
    return null;
  }
  let P1 = pHead.next;
  let P2 = pHead.next.next;
  // 1.判断是否有环
  while (P1 != P2) {
    if (P2 === null || P2.next === null) {
      return null;
    }
    P1 = P1.next;
    P2 = P2.next.next;
  }

  // 2.P1从相遇点出发，P2从链表头出发，相遇点即为交叉点
  P1=pHead
  while(P1!=P2) {
    P1=P1.next
    P2=P2.next
  }
  return P1
}
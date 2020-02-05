//使用map记录结点再进行删除
function deleteDuplication(pHead) {
  const map = {};
  if (pHead && pHead.next) {
    let current = pHead;
    // 计数
    while (current) {
      const val = map[current.val];
      map[current.val] = val ? val + 1 : 1;
      current = current.next;
    }
    current = pHead;
    while (current) {
      const val = map[current.val];
      if (val > 1) {
        // 删除节点
        console.log(val);
        if (current.next) {
          current.val = current.next.val;
          current.next = current.next.next;
        } else if (current === pHead) {
          current = null;
          pHead = null;
        } else {
          current = pHead;
          while (current.next.next) {
            current = current.next;
          }
          current.next = null;
          current = null;
        }

      } else {
        current = current.next;
      }
    }
  }
  return pHead;
}
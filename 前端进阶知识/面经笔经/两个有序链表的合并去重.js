function deleteRepeatMerge(head1,head2) {
  if(!head1||!head2) return head1||head2
  let new_head = new Node(null)
  let current = new_head
  let p1=head1,p2=head2
  while(p1&&p2) {
    if(p1<p2&&p1.val!=current.val){
      let node = new Node(p1.val)
      current.next = node
      p1=p1.next
    }else if(p1>p2&&p2.val!=current.val){
      let node = new Node(p2.val)
      current.next = node
      p2=p2.next
    }
    current = current.next
  }
  if(p1){
    while(p1!=null){
      const node = new Node(p1.val)
      current.next = node
      current=current.next
      p1=p1.next
    }
  }
  if(p2){
    while(p2!=null){
      const node = new Node(p2.val)
      current.next = node
      current=current.next
      p2=p2.next
    }
  }
  return new_head.next
}


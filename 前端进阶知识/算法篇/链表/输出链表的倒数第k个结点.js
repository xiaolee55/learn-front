
function FindKthToTail(head, k)
{
    let p,q;
    p=q=head
    var i = 0;
    while(p!=null){
        if(i>=k)
           q=q.next
         p=p.next
         i++
    }
    return i<k?null:q
    // write code here
}
function VerifySquenceOfBST(sequence) {
  if(!sequence||sequence.length==0)
    return true
  let root = sequence[sequence.length-1]
  for (let i = 0; i < sequence.length-1; i++) {
    if(sequence[i]>root)
      break
  }

  for (let j = i; j < sequence.length -1; j++) {
    if(sequence[j]<root) 
      return false
  }
  let left=true
  if(i>0) {
    left = VerifySquenceOfBST(sequence.slice(0,i))
  }
  var right = true
  if(i<sequence.length - 1) {
    right = VerifySquenceOfBST(sequence.slice(i,sequence.length-1))
  }
  return left&&right
}
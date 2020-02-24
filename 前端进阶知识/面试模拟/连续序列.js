function order(arr,num) {
  let start=0,sum=0
  for (let i = 0; i < arr.length; i++) {
    if(sum>num) {
      sum-=arr[start]
      start = start+1
    }else if(sum==num){
      return true
    }else{
      sum+=arr[i]
    }
  }
  if(sum==num) return true
  return false
}

console.log(order([],10))

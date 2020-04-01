function quitSort(array) {
  if(array.length==0) return []
  const tar = array[0],left=[],right=[]
  for (let i = 1; i < array.length; i++) {
    if(array[i]<tar){
      left.push(array[i])
    }else{
      right.push(array[i])
    }
  }
  return quitSort(left).concat(tar,quitSort(right))
}

console.log(quitSort([2,4,6,2,3,7,1,8]))
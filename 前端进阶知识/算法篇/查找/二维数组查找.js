function Find(array,k) {
  const x =  0  //x坐标
  const y = array.length-1  //y坐标
  return compare(array,k,y,x)
}

function compare(array,k,y,x) {
  if(y===undefined||x===undefined) return false
  if(k == array[y][x])
    return true
  else if(k>array[y][x])
    return compare(array,k,y,x+1)
  else
  return compare(array,k,y-1,x)
}

const arr = [[1,2,3],[4,5,6],[7,8,9]]
console.log(Find(arr,5))
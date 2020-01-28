let pre
let vin

while((pre=readline())!=null){
  vin = readline()
  print(getHRD(pre,vin))
}

function getHRD(pre, vin) {
  if(!pre) {
    return ''
  }
  if(pre.length === 1){
    return pre
  }
  const head = pre[0]   //拿到根节点
  const splitIndex = vin.indexOf(head)  //拿到根节点在中序遍历中的位置
  const vinLeft = vin.substring(0,splitIndex) //拿到左子树
  const vinRight = vin.substring(splitIndex+1) //拿到右子树
  const preLeft = pre.substring(1,splitIndex+1)  //拿到先序遍历的左子树
  const preRight = pre.substring(splitIndex+1)   //拿到先序遍历的右子树
  return getHRD(preLeft,vinLeft) + getHRD(preRight,vinRight) +head 
}
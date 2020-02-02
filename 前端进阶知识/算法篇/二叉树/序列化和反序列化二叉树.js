const treeNode = require('./treeNode.js')
function Serialize(pRoot, arr = []) {
  if (!pRoot) {
    arr.push('#');
  } else {
    arr.push(pRoot.value);
    Serialize(pRoot.left, arr)
    Serialize(pRoot.right, arr)
  }
  return arr.join(',');
}

function Deserialize(s) {
  if (!s) {
    return null;
  }
  return deserialize(s.split(','));
}

function deserialize(arr) {
  let node = null;
  const current = arr.shift();
  if (current !== '#') {
    node = { value: current }
    node.left = deserialize(arr);
    node.right = deserialize(arr);
  }
  return node;
}


let a = new treeNode(1)
let b = new treeNode(2)
let c = new treeNode(3)
a.left = b
a.right = c

let seStr = ''
console.log(seStr=Serialize(a));
console.log( Deserialize(seStr));

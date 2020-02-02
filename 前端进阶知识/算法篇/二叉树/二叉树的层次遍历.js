var levelOrder = function(root) {
  var queue = [];
  var result = [];
  if (root !== null) {
    queue.push(root);
  }
  while(queue.length !== 0) {
    var level = [];
    var len = queue.length;
    for (var i = 0; i < len; i ++) {   //一层一个数组，每层数组的元素数量就是当前队列中元素的数量（不包括最新插入的）
      var currentNode = queue.shift();
      level.push(currentNode.val);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
    result.push(level);
  }
  return result;
}

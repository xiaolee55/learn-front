// 比较两棵DOM树的差异是 Virtual DOM 算法最核心的部分，这也是所谓的 
// Virtual DOM 的 diff 算法。两个树的完全的 diff 算法是一个时间复杂度为
//  O(n^3) 的问题。但是在前端当中，你很少会跨越层级地移动DOM元素。所以 
//  Virtual DOM 只会对同一个层级的元素进行对比：

// 在实际的代码中，会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记,
// 在深度优先遍历的时候，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面。

// 2.diff 函数，对比两棵树
function diff (oldTree, newTree) {
  var index = 0 // 当前节点的标志
  var patches = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

// 对两棵树进行深度优先遍历
function dfsWalk (oldNode, newNode, index, patches) {
  // 对比oldNode和newNode的不同，记录下来
  patches[index] = [...]    //patches就是记录差异的，以树的索引值作为键，值是一个数组，数组包含新内容和类型的对象（因为一个结点可能涉及多个变化）

  diffChildren(oldNode.children, newNode.children, index, patches)
}

// 遍历子节点
function diffChildren (oldChildren, newChildren, index, patches) {
  var leftNode = null
  var currentNodeIndex = index
  oldChildren.forEach(function (child, i) {
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count) // 计算节点的标识
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, patches) // 深度遍历子节点
    leftNode = child
  })
}

//差异类型 
// var REPLACE = 0     //替换掉原来的节点
// var REORDER = 1    //移动、删除、新增子节点
// var PROPS = 2      //修改了节点的属性
// var TEXT = 3       //对于文本节点，文本内容可能会改变


//列表对比算法
//针对于多个已存在结点位置互换的情况，比如ul换成p，p换成ul，这个使用移动就能达到，但是按普通方式的话就要做替换（0号类型），导致效率低下
//字符串的最小编辑距离问题


// 3.把差异应用到真正的DOM树上
// 因为步骤一所构建的 JavaScript 对象树和render出来真正的DOM树的信息、结构是一样的。所以我们可以对那棵DOM树也进行深度优先的遍历，
// 遍历的时候从步骤二生成的patches对象中找出当前遍历的节点差异，然后进行 DOM 操作。
function patch (node, patches) {
  var walker = {index: 0}
  dfsWalk(node, walker, patches)
}

function dfsWalk (node, walker, patches) {
  var currentPatches = patches[walker.index] // 从patches拿出当前节点的差异

  var len = node.childNodes
    ? node.childNodes.length
    : 0
  for (var i = 0; i < len; i++) { // 深度遍历子节点
    var child = node.childNodes[i]
    walker.index++
    dfsWalk(child, walker, patches)
  }

  if (currentPatches) {
    applyPatches(node, currentPatches) // 对当前节点进行DOM操作
  }
}

function applyPatches (node, currentPatches) {
  currentPatches.forEach(function (currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        node.parentNode.replaceChild(currentPatch.node.render(), node)
        break
      case REORDER:
        reorderChildren(node, currentPatch.moves)
        break
      case PROPS:
        setProps(node, currentPatch.props)
        break
      case TEXT:
        node.textContent = currentPatch.content
        break
      default:
        throw new Error('Unknown patch type ' + currentPatch.type)
    }
  })
}
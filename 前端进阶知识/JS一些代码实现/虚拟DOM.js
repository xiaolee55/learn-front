//虚拟dom结点
function Element (tagName, props, children) {  
  this.tagName = tagName
  this.props = props
  this.children = children
}

//1.构造虚拟DOM
var ul =new Element('ul', {id: 'list'}, [     
  new Element('li', {class: 'item'}, ['Item 1']),
  new Element('li', {class: 'item'}, ['Item 2']),
  new Element('li', {class: 'item'}, ['Item 3'])
])

// 渲染为真实的DOM结点
Element.prototype.render = function () {
  var el = document.createElement(this.tagName) // 根据tagName构建
  var props = this.props

  for (var propName in props) { // 设置节点的DOM属性
    var propValue = props[propName]
    el.setAttribute(propName, propValue)
  }

  var children = this.children || []

  children.forEach(function (child) {
    var childEl = (child instanceof Element)
      ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
      : document.createTextNode(child) // 如果字符串，只构建文本节点
    el.appendChild(childEl)
  })

  return el
}

//渲染DOM结点并挂载至文档
var ulRoot = ul.render()
document.body.appendChild(ulRoot)

console.log(ul);

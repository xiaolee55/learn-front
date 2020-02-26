function DOM2JSON(str) {
  let reg = /<(.+)>(.*?)<\/\1>/g // 注意 .\*? 是惰性匹配，如果使用 .\* 这样的情况会出问题: <span><a></a></span><span></span> 不会最短地闭合
  let result = null
  let nodes = []
  while((result = reg.exec(str)) !== null) { // 当 exec() 再也找不到匹配项后它将返回 null，并把 lastIndex 属性重置为 0
    nodes.push({ tag: result[1], children: DOM2JSON(result[2])}) // exec 返回的数组，[0]匹配的字符串 然后依次是捕获的分组 然后有 index 和 input 属性
  }
  return nodes.length > 1 ? nodes : nodes[0]
}

console.log(DOM2JSON("<div><div></div></div>"));

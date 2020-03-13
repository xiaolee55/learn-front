const flat = (array) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result = result.concat(flat(array[i]));
    } else {
      result.push(array[i]);
    }
  }
  return result;
}

//简化版
function flatten(array) {
  return array.reduce(
    (target, current) =>
      Array.isArray(current) ?
        target.concat(flatten(current)) :
        target.concat(current)
    , [])
}

//指定深度
function flattenByDeep(array, deep = 1) {
  return array.reduce(
    (target, current) =>
      Array.isArray(current) && deep > 1 ?
        target.concat(flattenByDeep(current, deep - 1)) :
        target.concat(current)
    , [])
}








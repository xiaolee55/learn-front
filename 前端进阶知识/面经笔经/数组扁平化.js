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

const flatten = (array,deep) => array.reduce((pre,cur)=>
Array.isArray(cur)?
pre.concat(flatten(cur)) : 
pre.concat(cur),[])

// function flatten(array) {
//   return array.reduce(
//     (target, current) =>
//       Array.isArray(current) ?
//         target.concat(flatten(current)) :
//         target.concat(current)
//     , [])
// }
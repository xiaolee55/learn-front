var str = '1234567893433';
//[9,8,7,6,5,4,3,2,1]
function formatCash(str) {
  //不考虑入参的判断
  return String(str).split('').reverse().reduce((pre, next, index) => {
    return (index % 3) ? (next + "" + pre) : (next + ',' + pre);
  })
}

console.log(formatCash(str));
// 1.只能出现数字、符号位、小数点、指数位
// 2.小数点，指数符号只能出现一次、且不能出现在开头结尾
// 3.指数位出现后，小数点不允许在出现
// 4.符号位只能出现在开头和指数位后面

function isNumberic(s) {
  if(s===undefined) {
    return false
  }
  let hasPoint = false
  let hasExp = false
  for (let i = 0; i < s.length; i++) {
    const target = s[i]
    if(target>=0&&target<=9) {
      continue
    }else if(target==='e'||target==='E') {
      if(hasExp || i===0 || i===s.length-1) {
        return false  //如果出现过E了又出现，则报错
      }else {
        hasExp = true
        continue
      }
    } else if(target === '.') {
      //.不能出现一次以上，不能出现在e后面，不能出现在开头末尾
      if(hasPoint||hasExp || i===0 || i ===s.length-1) {
        return false
      } else {
        hasPoint = true //没出现过的则标记hasPoint为true
        continue
      }
    } else if(target==='-'||target==='+') { 
      //加减号只能出现在开头或者e的后面
      if(i===0||s[i-1]==='e'||s[i-1]==='E') {
        continue
      }else {
        return false
      }
    } else {
      return false
    }
  }
}
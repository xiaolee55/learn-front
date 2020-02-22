function bigIntAdd(str1, str2) {
  let result = [];
  let ary1 = str1.split("");
  let ary2 = str2.split("");
  let flag = false; //是否进位
  while (ary1.length || ary2.length) {
    let result_c = sigle_pos_add(ary1.pop(), ary2.pop());  //从最后一位开始相加
    if (flag) {    //如果上一轮有进位，则本轮的值加1
      result_c = result_c + 1;
    }
    result.unshift(result_c % 10);    //在头部插入不包含本轮进位的值

    if (result_c >= 10) {   //如果本轮的值有进位，则修改进位标志符
      flag = true;
    } else {
      flag = false;
    }
  }
  if(flag) {    //循环内没有处理完的继续插入
    result.unshift('1');
  }
  return result.join("");
}

function sigle_pos_add(str1_c, str2_c) {
  let l = (r = 0);
  if (str1_c) {
    l = Number(str1_c);
  }
  if (str2_c) {
    r = Number(str2_c);
  }
  return l + r;
}

console.log(bigIntAdd("12345678","1234579678"))
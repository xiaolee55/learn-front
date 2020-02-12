// 创建一个长度为256的数组container来标记字符流中字符出现的次数

// 使用字符ASCII码作为下标，这样数组长度最大为256

// 当字符没有出现过，标记为-1

// 当字符只出现一次，标记为字符在字符流中的位置index

// 当字符出现多次时，标记为-2

// 当调用FirstAppearingOnce时，只需要找到，数组值大于-1的且值最小的位置索引，即为第一个出现次数为1的字符
function Init() {
   //创建一个数组，ASCII码表的长度256
  container = new Array(256).fill(-1);
  index = 0;   //记录字符的出现顺序
}
function Insert(ch) {
  const code = ch.charCodeAt(0);  //得到插入值的ASCII码值
  if (container[code] === -1) {   //如果值等于-1，说明没有被插入过，则将其值变为当前字符的出现顺序
    container[code] = index; 
  } else if (container[code] >= 0) {  //重复出现，将值改为-2
    container[code] = -2;
  }
  index++;
}
function FirstAppearingOnce() {  //找到index最小的，即出现的最早的
  let minIndex = 256;  //维护一个最小值变量
  let strIndex = 0;  //和最小值变量对应的数组下标，即字母的ASCII码值
  for (let i = 0; i < 256; i++) {
    if (container[i] >= 0 && container[i] < minIndex) {
      minIndex = container[i];
      strIndex = i;
    }
  }
  return minIndex === 256 ? '#' : String.fromCharCode(strIndex);
}
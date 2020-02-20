const unique = (array)=> {  //利用对象的键去重
  var container = {}; 
  return array.filter((item, index) =>  container.hasOwnProperty(item) ? false : (container[item] = true));
}

//filter+indexOf去重
const unique = arr => arr.filter((e,i) => arr.indexOf(e) === i);

const filterNonUnique = arr => arr.filter(i =>   //移除重复的数字（一个不剩）
  arr.indexOf(i) === arr.lastIndexOf(i)
)

function unique(array) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
      var current = array[i];
      if (res.indexOf(current) === -1) {  //看是否存在新数组中
          res.push(current)
      }
  }
  return res;
}

//Set去重
const unique = arr => Array.from(new Set(arr));

const unique = arr => [...new Set(arr)];


//排序再去重
var array = [1, 1, '1'];

function unique(array) {
    var res = [];
    var sortedArray = array.concat().sort();
    var seen;
    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i];
    }
    return res;
}

console.log(unique(array));
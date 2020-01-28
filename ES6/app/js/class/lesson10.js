{
  // Set和数组对应
  let list = new Set();
  list.add(5);
  list.add(7);
  // size相当于数组中的长度
  console.log('size',list.size);
}

{
  // 可以将一个数组作为参数传进Set
  let arr = [1,2,3,4,5];
  let list = new Set(arr);

  console.log('size',list.size);
}

{
  // 添加重复元素，重复元素会被过滤只留下一个，可用来去重，不会做数据类型转换
  let list = new Set();
  list.add(1);
  list.add(2);
  list.add(1);

  console.log('list',list);

  let arr=[1,2,3,1,'2'];
  let list2=new Set(arr);

  console.log('unique',list2);
}

{

  let arr=['add','delete','clear','has'];
  let list=new Set(arr);
  // has是用来检查是否含有该元素
  console.log('has',list.has('add'));
  //delete是删除某个元素
  console.log('delete',list.delete('add'),list);
  // 清空Set
  list.clear();
  console.log('list',list);
}

{
  let arr=['add','delete','clear','has'];
  let list=new Set(arr);

  //key和value的值都是一样的，都是元素的值
  for(let key of list.keys()){
    console.log('keys',key);
  }
  for(let value of list.values()){
    console.log('value',value);
  }
  for(let [key,value] of list.entries()){
    console.log('entries',key,value);
  }

  list.forEach(function(item){console.log(item);})
}


{
  //1. WeakSet的值只能是对象
  //2.WeakSet的对象都是弱引用，不会和垃圾回收机制有关，里面的值都是引用
  let weakList=new WeakSet();

  let arg={};

  weakList.add(arg);

  // weakList.add(2);

  console.log('weakList',weakList);
}

{

  // map，每个元素都有一个键和值，类型都可以是任意
  let map = new Map();
  let arr=['123'];

  //map添加元素用set
  map.set(arr,456);

  console.log('map',map,map.get(arr));
}

{

  let map = new Map([['a',123],['b',456]]);
  console.log('map args',map);
  console.log('size',map.size);
  console.log('delete',map.delete('a'),map);
  console.log('clear',map.clear(),map);
}

{
  // 没有size属性，不能使用clear，不能遍历
  let weakmap=new WeakMap();

  let o={};
  weakmap.set(o,123);
  console.log(weakmap.get(o));
}

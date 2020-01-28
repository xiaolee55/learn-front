{
  // 更精确的创建数组，创建一个以of里面的内容为元素的数组
  let arr = Array.of(3,4,7,9,11);
  console.log('arr=',arr);

  let empty=Array.of();
  console.log('empty',empty);
}

{
  // 将一些集合之类的数据转为数组
  let p=document.querySelectorAll('p');
  let pArr=Array.from(p);
  pArr.forEach(function(item){
    console.log(item.textContent);
  });

  //第二个参数可以是一个函数，对前面的数组做一个映射
  console.log(Array.from([1,3,5],function(item){return item*2}));
} 

{
  // 填充数组，第一个参数是替换成哪个元素，第二个是替换的起始位置，第二个替换的终点位置
  console.log('fill-7',[1,'a',undefined].fill(7));
  console.log('fill,pos',['a','b','c'].fill(7,1,3));
}

{
  // let...of...,array.keys()返回的是数组下标，array.values()返回数组的值，array.entries()以数组形式返回索引和值
  for(let index of ['1','c','ks'].keys()){
    console.log('keys',index);
  }
  for(let value of ['1','c','ks'].values()){
    console.log('values',value);
  }
  for(let [index,value] of ['1','c','ks'].entries()){
    console.log('values',index,value);
  }
}
 
{
  // 第一个参数表示从哪个位置开始替换，第二个参数表示从哪个位置开始读取，第三个参数表示到第几个之前截止
  console.log([1,2,3,4,5].copyWithin(0,3,4));
}

{
  // find接收一个函数，返回经过函数处理的元素，findIndex返回索引
  console.log([1,2,3,4,5,6].find(function(item){return item>3}));
  console.log([1,2,3,4,5,6].findIndex(function(item){return item>3}));
}

{
  // 判断某个元素是否存在于数组，NaN也可以进行判断
  console.log('number',[1,2,NaN].includes(1));
  console.log('number',[1,2,NaN].includes(NaN));
}

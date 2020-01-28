{
  // Symbol是一种数据类型，申明一个独一无二的值，永远不会和其他变量相等
  let a1=Symbol();
  let a2=Symbol();
  console.log(a1===a2);
  // 如果参数中的变量已经被声明过，那取到的值就是上一次声明的变量，否则重新开一个Symbol变量
  let a3=Symbol.for('a3');
  let a4=Symbol.for('a3');
  console.log(a3===a4);
}

{
  //Symbol('abc')和变量abc不是同一个变量
  let a1=Symbol.for('abc');
  let obj={
    [a1]:'123',
    'abc':345,
    'c':456
  };
  console.log('obj',obj);

  //无法取到Symbol属性
  for(let [key,value] of Object.entries(obj)){
    console.log('let of',key,value);
  }
//  取到所有Symbol属性
  Object.getOwnPropertySymbols(obj).forEach(function(item){
    console.log(obj[item]);
  })
// 取到所有属性（包括Symbol和普通属性）Reflect.ownKeys() 
  Reflect.ownKeys(obj).forEach(function(item){
    console.log('ownkeys',item,obj[item]);
  })
}

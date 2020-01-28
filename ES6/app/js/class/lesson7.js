{
  //参数默认值，防止出现undefined
  function test(x, y = 'world'){
    console.log('默认值',x,y);
  }
  test('hello');
  test('hello','kill');
}

{
  //上一个参数作为默认值，取得是最近的作用域的变量的值
  let x='test';
  function test2(x,y=x){
    console.log('作用域',x,y);
  }
  test2('kill');
}
 
{
  //...接收一个数组，...一定要放在最后
  function test3(...arg){
    for(let v of arg){
      console.log('rest',v);
    }
  }
  test3(1,2,3,4,'a');
}

{
  // ...运算符展开或者接收数组
  console.log(...[1,2,4]);
  console.log('a',...[1,2,4]);
}

{
  // 箭头函数
  let arrow = v => v*2;
  let arrow2 = () => 5;
  console.log('arrow',arrow(3));
  console.log(arrow2());

}

{
  //尾调用，提示递归性能
  function tail(x){
    console.log('tail',x);
  }
  function fx(x){
    return tail(x)
  }
  fx(123)
}

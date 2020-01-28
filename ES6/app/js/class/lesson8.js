{
  // 简洁表示法
  let o=1;
  let k=2;
  let es5={
    o:o,
    k:k
  };
  // 属性名会自动向上寻找对应变量
  let es6={
    o,
    k
  };
  console.log(es5,es6);

  let es5_method={
    hello:function(){
      console.log('hello');
    }
  };
  let es6_method={
    hello(){
      console.log('hello');
    }
  };
  console.log(es5_method.hello(),es6_method.hello());
}

{
  // 属性表达式
  let a='b';
  let es5_obj={
    a:'c',
    b:'c'
  };
//变量作为属性名
  let es6_obj={
    [a]:'c'
  }

  console.log(es5_obj,es6_obj);

}

{
  // 新增API
  // Object.is判断两个值是否相等，功能上和全等符一样 
  console.log('字符串',Object.is('abc','abc'),'abc'==='abc');
  console.log('数组',Object.is([],[]),[]===[]);
  //拷贝，将前一个对象的属性拷贝到后一个对象，重复的属性后面的对象覆盖前面的，只是浅拷贝，拷贝的是值，引用没改，继承的属性也不会拷贝
  console.log('拷贝',Object.assign({a:'a'},{b:'b'}));
  
  //Object.entries获取键值对
  let test={k:123,o:456};
  for(let [key,value] of Object.entries(test)){
    console.log([key,value]);
  }
}

{
  // 扩展运算符
  // let {a,b,...c}={a:'test',b:'kill',c:'ddd',d:'ccc'};
  // c={
  //   c:'ddd',
  //   d:'ccc'
  // }
}

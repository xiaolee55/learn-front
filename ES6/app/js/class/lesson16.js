//Decorator是一个函数
//用来修改类的行为
//只在类中有用（可以写在类里面的第一句，也可以写在类中，可以传递参数）

{
  //写一个修饰器 
  let readonly=function(target,name,descriptor){
    descriptor.writable=false;
    return descriptor
  };

  class Test{
    @readonly   //使用到类中
    time(){
      return '2017-03-11'
    }
  }

  let test=new Test();

  // 修饰器阻止了属性修改
  // test.time=function(){
  //   console.log('reset time');
  // };

  console.log(test.time());
}


{
  //定义一个修饰器吗，为类添加一个myname的静态属性
  let typename=function(target,name,descriptor){
    console.log(target,name,descriptor);
    
    target.myname='hello';
  }

  @typename
  class Test{
 
  }

  console.log('类修饰符',Test.myname);
  // 第三方库修饰器的js库：core-decorators; npm install core-decorators
}

{
  let log=(type)=>{
    return function(target,name,descriptor){
      let src_method=descriptor.value;
      descriptor.value=(...arg)=>{
        console.log(target);
        
        src_method.apply(target,arg);
        console.log(`log ${type}`);
      }
      
    }
  }

  class AD{
    @log('show')
    show(){
      console.log('ad is show');
      
    }
    @log('click')
    click(){
      console.log('ad is click');
      
    }
  }

  let ad=new AD();
  ad.show();
  ad.click();
}
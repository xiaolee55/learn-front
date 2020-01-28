import { Agent } from "http";

{
  let obj={
    time:'2017-03-11',
    name:'net',
    _r:123
  };

  let monitor=new Proxy(obj,{
    // 拦截对象属性的读取
    //target就是被代理的对象，key就是传进来的属性，value是要设置成的值
    get(target,key){
      return target[key].replace('2017','2018')
    },
    // 拦截对象设置属性
    set(target,key,value){
      if(key==='name'){
        return target[key]=value;
      }else{
        return target[key];
      }
    },
    // 拦截key in object操作
    has(target,key){
      if(key==='name'){
        return target[key]
      }else{
        return false;
      }
    },
    // 拦截delete
    deleteProperty(target,key){
      if(key.indexOf('_')>-1){
        delete target[key];
        return true;
      }else{
        return target[key]
      }
    },
    // 拦截Object.keys,Object.getOwnP  ropertySymbols,Object.getOwnPropertyNames
    ownKeys(target){
      return Object.keys(target).filter(item=>item!='time')
    }
  });

  console.log('get',monitor.time);

  monitor.time='2018';
  monitor.name='mukewang';
  console.log('set',monitor.time,monitor);

  console.log('has','name' in monitor,'time' in monitor);

  // delete monitor.time;
  // console.log('delete',monitor);
  
  // delete monitor._r;
  // console.log('delete',monitor);
  console.log('ownKeys',Object.keys(monitor));

}

{
  let obj={
    time:'2017-03-11',
    name:'net',
    _r:123
  };
  //Reflect不用new，直接使用，方法名称和效果和Proxy一样,但是Proxy的方法是隐式调用，Reflect需要显示调用

  console.log('Reflect get',Reflect.get(obj,'time'));
  Reflect.set(obj,'name','mukewang');
  console.log(obj);
  console.log('has',Reflect.has(obj,'name'));
}

{
  // 使用场景：数据类型的校验
   // 将验证和属性完全隔离开，提高代码健壮性，扩展性
  function validator(target,validator) {
    return new Proxy(target,{
      _validator: validator,      //获取验证对象
      set(target,key,value,proxy){  
        if(target.hasOwnProperty(key)){   //是否有该属性
          let va=this._validator[key];    //将验证方法取出到va
          if(!!va(value)){                //方法返回true则赋值成功
            return Reflect.set(target,key,value,proxy)
          }else{
            throw Error(`不能设置${key}到${value}`)
          }
        }else{
          throw Error(`${key}不存在`)
        }
      }
    })
  }

  const personValidators={
    name(val){
      return typeof val==='string'
    },
    age(val){
      return typeof val==='number' && val>18
    }
  }

  class Person{
    constructor(name,age){
      this.name=name;
      this.age=age;
      return validator(this,personValidators)  //代理person对象，this就是person实例
    }
  }

  const person=new Person ('lilei',30)
  person.name=48
  person.name='48'
  console.log(person)
}

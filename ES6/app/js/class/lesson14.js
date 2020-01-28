{
  let arr=['hello','world'];
  // 返回一个对象给map,对象有next方法，相当于for循环的下一步
  let map=arr[Symbol.iterator]();
  console.log(map.next());
  console.log(map.next());
  console.log(map.next());
}

{
  let obj={
    start:[1,3,2],
    end:[7,9,8],
    //自定义遍历方法
    [Symbol.iterator](){
      let self=this;
      let index=0;
      let arr=self.start.concat(self.end);
      let len=arr.length;
      //返回对象，一定要有done属性和value属性
      return {
        next(){
          if(index<len){
            return {
              value:arr[index++],
              done:false
            }
          }else{
            return {
              value:arr[index++],
              done:true
            }
          }
        }
      }
    }
  }
  for(let key of obj){
    console.log(key);
  }
}

{
  // for of方法继续iterator,没有默认的就要自定义
  let arr=['hello','world'];
  for(let value of arr){
    console.log('value',value);
  }
}

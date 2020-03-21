const arr = [1,3,4]

Object.defineProperty(arr,1,{
  get(){
    console.log(111)
  },
  set(val){
    console.log("err",val);
  }
})

arr[1] = 2
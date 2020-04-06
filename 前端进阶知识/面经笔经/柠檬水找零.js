var lemonadeChange = function(bills) {
  let map = new Map()
  let FIV = 5, TEN = 10
  map.set(FIV,0),map.set(TEN,0)
  for(let i=0;i<bills.length;i++){
      let fiv = map.get(FIV)
      let ten = map.get(TEN)
      if(bills[i]==FIV){
          map.set(FIV,++fiv)
      }else if(bills[i]==TEN){
          if(fiv>0){
              map.set(TEN,++ten)
              map.set(FIV,--fiv)
          }else{
              return false
          }
      }else{
          if(ten>=1){
            if(fiv>=1){
              map.set(FIV,--fiv)
              map.set(TEN,--ten)
            }else{
              return false
            }
          }else if(fiv>=3){
              fiv-=3
              map.set(FIV,fiv)
          }else{
              return false
          }
      }
  }
  return true
};

console.log(lemonadeChange([5,5,5,10,5,5,10,20,20,20]))
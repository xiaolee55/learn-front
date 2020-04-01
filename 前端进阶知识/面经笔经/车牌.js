var shortestCompletingWord = function(licensePlate, words) {
  let str = licensePlate.replace(/(\d+)|(\s+)/g,"").toLowerCase()
  let min = 15,index = 0
  console.log(str)
  for(var i=0;i<words.length;i++){
      let tmp = words[i]
      for(var j=0;j<str.length;j++){
          if(tmp.includes(str[j])){
            tmp=tmp.replace(new RegExp(str[j]),"")
          }else{
            break
          }
      }   
      if(j==str.length&&min>words[i].length) {
          min= words[i].length
          index = i
      }  
  }
  return words[index]
};

console.log(shortestCompletingWord("1s3 456",["looks","pest","stew","show"]))
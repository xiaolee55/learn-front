var compressString = function(S) {
  let new_str = S[0]
  for(let i=0;i<S.length;i++){
      if(Number(new_str[new_str.length-1])==new_str[new_str.length-1]){
          if(new_str[new_str.length-2]==S[i]){
              new_str[new_str.length-1] =new_str[new_str.length-1]+1 
          }else{
              new_str+=S[i]
          }
      }else{
          if(new_str[new_str.length-1]==S[i]){
              new_str+=2
          }else{
              new_str+=1
              new_str+=S[i]
          }
      }
  }
  console.log(new_str);
  
  return new_str.length>S.length?S:new_str
};

compressString("aabcccccaaa")
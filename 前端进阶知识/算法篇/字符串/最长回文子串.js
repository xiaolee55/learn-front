var longestPalindrome = function(s) {
  if(!s||s.length===1)return s
  let maxLen=1,start=0
  let dp=new Array(s.length)
  for (let i = 0; i < s.length; i++) {
    dp[i]=new Array(s.length)
  }
  
  for(let i=0;i<s.length;i++){
      dp[i][i]=true
  }

  for(let j=1;j<s.length;j++){
      for(let i=0;i<j;i++){
          if(s[i]===s[j]){
              if(j-i<3){
                  dp[i][j]=true
              }
              else{
                  dp[i][j]=dp[i+1][j-1]
              }
          }else{
              dp[i][j]=false
          }
          if(dp[i][j]){
              let curLen=j-i+1
              if(curLen>maxLen){
                  maxLen=curLen
                  start=i
              }
          }
      }
  }
  return s.substring(start,start+maxLen)
};

console.log(longestPalindrome("abcba"));

var minimumTotal = function(triangle) {
  const dp=[]
  dp[0]=[]
  dp[0].push(triangle[0])
  for(let i=1;i<triangle.length;i++){
      for(let j=0;j<triangle[i].length;j++){
          if(j==triangle[i].length-1){
              dp[i][j]=Number(dp[i-1][dp[i-1].length-1])+Number(triangle[i][j])
          }else if(j==0){
              dp[i]=[]
              dp[i][j]=Number(dp[i-1][0])+Number(triangle[i][0])
          }else{
              dp[i][j]=Number(Math.min(dp[i-1][j-1],dp[i-1][j]))+triangle[i][j]
          }
      }
  }
  let tmp = dp[dp.length-1]
  let min=tmp[0]
  for(let i=0;i<tmp.length;i++){
      if(min>tmp[i]) min = tmp[i]
  }
  console.log(min);
  
  return min
};

minimumTotal([
  [2],
 [3,4],
[6,5,7],
[4,1,8,3]
])
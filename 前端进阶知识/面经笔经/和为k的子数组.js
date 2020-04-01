var subarraySum = function(nums, k) {
  const dp = []
  let num = 0
  for(let i=0;i<nums.length;i++){
      for(let j=i;j<nums.length;j++){
        if(j==i){
          dp[i]=[]
          dp[i][j] = nums[i]
          continue
        }else{
          dp[i][j] = dp[i][j-1]+nums[j]
          if(dp[i][j]==k) num++
        }
      }
  }
  console.log(dp,num)
  return num
};

subarraySum([1,2,3],2)
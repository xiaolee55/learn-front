var isStraight = function(nums) {
  let zero = 0;
  nums = nums.sort()
  for(let i=0;i<nums.length-1;i++){
      if(nums[i]==0){
          zero++
          continue
      }else if(nums[i+1]==nums[i]+1){
          continue
      }else if(nums[i+1]==nums[i]){
          return false
      }else{
          zero=zero-(nums[i+1]-nums[i]-1)
      }
  }
  return zero<0?false:true

};

isStraight([10,11,0,12,6])
function search(nums,target) {
  nums.sort()
  let start = 0,end=nums.length-1
  while(start<=end){
    let mid = Math.floor(start+(end-start)/2)
    if(nums[mid]<target){
      start = mid+1
      continue
    }else if(nums[mid]>target){
      end = mid-1
    }else{
      return mid
    }
  }
  
}
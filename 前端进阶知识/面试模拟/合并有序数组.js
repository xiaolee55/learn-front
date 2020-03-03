var merge = function(nums1, m, nums2, n) {
  let p=0,q=0,tmp=[]
  while(p<m&&q<n){
      if(nums1[p]<nums2[q]){
          tmp.push(nums1[p])
          p++
      }else{
          tmp.push(nums2[q])
          q++
      }
  }
  if(p<m){
      while(p<m){
          tmp.push(nums1[p])
          p++
      }
  }
  console.log(q,n)
  if(q<n){
      while(q<n){
          tmp.push(nums2[q])
          q++
      }
  }
  nums1 = tmp
  return nums1
};

console.log(merge([1,2,3,0,0,0],3,[2,5,6],3))
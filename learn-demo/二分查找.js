function minNumberInRotateArray(roateArray)
{
   let array = roateArray
   var low = 0 ; 
   var high = array.length - 1;   
        while(low < high){
            var mid =  Math.floor(low + (high - low) / 2);
            if(array[mid] > array[high]){
                low = mid + 1; 
            }else if(array[mid] == array[high]){
                high = high - 1;
            }else{
                high = mid;
            }   
        }
        return array[low];
    // write code here
}

console.log(minNumberInRotateArray([2,3,4,5,6,1,2]))
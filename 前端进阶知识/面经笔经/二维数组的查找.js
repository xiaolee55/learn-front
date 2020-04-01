var findNumberIn2DArray = function(matrix, target) {
  let j=matrix.length-1,i=0
  while(j>=0&&i>=0){
    console.log(i,j)
      if(matrix[i][j]>target){
          j--
      }else if(matrix[i][j]<target){
          i++
      }else{
          return matrix[i][j]
      }
  }
  return null
};

const a =findNumberIn2DArray([
  [1,4,7,11,15],
  [2,5,8,12,19],
  [3,6,9,16,22],
  [10,13,14,17,24],
  [18,21,23,26,30]],20)

console.log(a);

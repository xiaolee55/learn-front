function printMatrix(matrix)
{
   var row = matrix.length;   //行数
   var col = matrix[0].length; //列数
   var i = 0;
   var j = 0;
   var dir = 1;     //用来控制是向左走行（1），还是向下走列(2)，还是向右走行(3），还是向上走列(4)
   var circle = 0;  //循环的圈数
   var result = [];
   while(result.length<row*col){   //循环一共要走行乘以列的数目
       switch(dir) {
           case 1:       //从左至右
               if(j< col-circle) {   
                   result.push(matrix[i][j]);
                   j++;
               } else {   //本行已经遍历结束，此时j多走了一位，所以减回来，开始走i,要先++，因为当前的元素已经走过
                   j--;
                   i++;
                   dir = 2;   
               }
               break;
           case 2:       //从上至下
                if(i < row -circle) {
                     result.push(matrix[i][j]);
                     i++;
                } else {   //本列已经遍历结束，此时i多走了一位，所以减回来，开始向右走，要先j--，因为当前元素已经走过
                   i--;
                   j--;
                  dir = 3;
               }
               break;
           case 3:      //从右至左
               if(j>=circle) {
                   result.push(matrix[i][j]);
                   j--;
               } else {
                   j++;
                   i--;
                   dir = 4;
               }
               break;
           case 4:      //从下至上
               if(i > circle) {
                   result.push(matrix[i][j]);
                   i--;
               } else {
                   i++;
                   j++;
                   circle++;    //第一圈结束，第二圈开始
                   dir = 1;
               }
               break;
       }
   }
    return result;
}
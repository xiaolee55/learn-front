

var spiralOrder = function(matrix) {
    if(matrix.length==0){
        return []
    }
    let up = 0;
    let down = matrix.length-1;
    let left = 0;
    let right = matrix[0].length-1;

    const res = [];

    while (left<=right&&up<=down){
        //从左往右
        for(let i=left;i<=right;i++){
            res.push(matrix[up][i])
        }
        up=up+1;
        if(up>down){
            break
        }
        //从上往下
        for(let j=up;j<=down;j++){
            res.push(matrix[j][right])
        }
        right = right-1;

        if(left>right){
            break
        }
        //从左到右
        for(let z = right;z>=left;z--){
            res.push(matrix[down][z])
        }
        down = down - 1;
        //从下到上
        for(let d = down;d>=up;d--){
            res.push(matrix[d][left])
        }
        left = left +1;
    } 
    return res
};

// function printMatrix(matrix)
// {
//    var row = matrix.length;   //行数
//    var col = matrix[0].length; //列数
//    var i = 0;
//    var j = 0;
//    var dir = 1;     //用来控制是向左走行（1），还是向下走列(2)，还是向右走行(3），还是向上走列(4)
//    var circle = 0;  //循环的圈数
//    var result = [];
//    while(result.length<row*col){   //循环一共要走行乘以列的数目
//        switch(dir) {
//            case 1:       //从左至右
//                if(j< col-circle) {   
//                    result.push(matrix[i][j]);
//                    j++;
//                } else {   //本行已经遍历结束，此时j多走了一位，所以减回来，开始走i,要先++，因为当前的元素已经走过
//                    j--;
//                    i++;
//                    dir = 2;   
//                }
//                break;
//            case 2:       //从上至下
//                 if(i < row -circle) {
//                      result.push(matrix[i][j]);
//                      i++;
//                 } else {   //本列已经遍历结束，此时i多走了一位，所以减回来，开始向右走，要先j--，因为当前元素已经走过
//                    i--;
//                    j--;
//                   dir = 3;
//                }
//                break;
//            case 3:      //从右至左
//                if(j>=circle) {
//                    result.push(matrix[i][j]);
//                    j--;
//                } else {
//                    j++;
//                    i--;
//                    dir = 4;
//                }
//                break;
//            case 4:      //从下至上
//                if(i > circle) {
//                    result.push(matrix[i][j]);
//                    i--;
//                } else {
//                    i++;
//                    j++;
//                    circle++;    //第一圈结束，第二圈开始
//                    dir = 1;
//                }
//                break;
//        }
//    }
//     return result;
// }
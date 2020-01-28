function printMatrix(matrix)
{
    // write code here
    var start=0;
    var arr = []
    if(!matrix||matrix.length==0)
        return []
    if(matrix.length==1)
        return matrix[0]
    else if(matrix.length!=0&&matrix[0].length==1){
        for(var i=0;i<matrix.length;i++)
            arr.push(matrix[i][0])
            return arr
    }
    else{
        var len1=matrix.length
        var len2=matrix[0].length
        var temp1=len1,temp2=len2
        var end = len1<len2?len1:len2
        var flag=false
        if(end%2==1)
            flag=true
        for(var i=start;i<end/2;i++){
            for(var k=0;k<4;k++){
                if(k==0)
                    for(var j=i;j<temp2;j++)
                        arr.push(matrix[i][j])
                if(k==1)
                    for(var j=i+1;j<temp1;j++)
                        arr.push(matrix[j][temp1-1])
                if(k==2)
                    for(var j=temp2-2;j>=i;j--)
                        arr.push(matrix[temp2-1][j])
                if(k==3)
                    for(var j=temp1-2;j>i;j--)
                        arr.push(matrix[j][i])
             }
            temp1--
            temp2--
            end--
        }
    }
    if(flag)
        arr.push(matrix[parseInt(len1/2)][parseInt(len2/2)])
    return arr
}
console.log(printMatrix([[1,2],[3,4],[5,6],[7,8],[9,10]]))
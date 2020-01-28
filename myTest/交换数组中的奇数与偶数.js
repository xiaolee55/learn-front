function reOrderArray(array)
{
   if(array.length==0)
       return
    var i=0,j
    while(i<array.length){
        while(i<array.length&&array[i]&1==1)  //找到第一个奇数的位置
            i++
        j=i+1
         while(j<array.length&&array[j]&1==0)  //判断这个奇数后面是否都是偶数
            j++;
        if(j<array.length){  //如果不是，则将该奇数与偶数块交换位置
            var temp=array[j]
            for(var k=j-1;k>=i;k--){
                array[k+1]=array[k]
            }
            array[i++]=temp  //再次从下一位判断
        }
    }
    return array
    // write code here
}
reOrderArray([1,4,6,3,7,3,3,2,6,8,93,23,54])
function LeftRotateString(str, n)
{
    // write code here
   // if(!str)return '';
   // var len=str.length;
    //return str.concat(str).slice(n,n+len);   //将两个数组拼接起来再切割n到n+数组长度位
    
    //原理：YX = (XTY T)T
    if(!str||str.length<n) return ''
    let arr=str.split('')
    reserve(arr,0,n-1) //第一次先反转0~n-1位
    reserve(arr,n,arr.length-1)   //第二次反转n~最后一位
    reserve(arr,0,arr.length-1)   //最后再反转整个字符串
    return arr.join('')
}
function reserve(arr,start,end){
    while(start<end){
      [arr[start],arr[end]]=[arr[end],arr[start]]
      start++
      end--
    }
    return arr
}
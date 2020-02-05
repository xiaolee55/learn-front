function NumberOf1(n)
{
    let k=0
    while(n>=0){
        n%2==1?k++:''
        n=Math.floor(n/2)
    }
    if(n<0){
      
    }
    return k
    // write code here
}

console.log(NumberOf1(21));

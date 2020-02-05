function Power(base, exponent)
{
    var n=Math.abs(exponent);
        if(n==0)
            return 1;
        if(n==1)
            return base;
       var result=Power(base,n>>1);
        result*=result;
        if((n&1)==1)
            result*=base;
        if(exponent<0)
            result=1/result;
        return result;            
     
    // write code here
}
Power(3, 10)
function rectCover(number)
{
    var fir=1,sec=2,thir=3
    if(number==0||number==1||number==2)
         return number;
    for(var i=2;i<number;i++){
        const tem=thir
        thir = fir+sec
        fir=sec;
        sec=tem
    }
    return thir
    // write code here
}
console.log(rectCover(5))
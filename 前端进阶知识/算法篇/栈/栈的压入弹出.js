function IsPopOrder(pushV, popV)
{
    if(pushV.length==0||popV.length==0)
        return false;
    let newStack = []
    var popIndex=0
    for(var i=0;i<pushV.length;i++){
        //借助辅助栈，每压一个元素进入辅助栈，都和弹出栈的对应元素做比较，如果相等，则将辅助栈的栈顶弹出
        //接着比较下一个元素，否则继续压栈到辅助站，直到辅助栈为空，说明符合
        newStack.push(pushV[i])
        while(newStack.length!=0&&newStack[newStack.length-1]==popV[popIndex]){
            //出栈
            newStack.pop()
            popIndex++
        }
    }
    return newStack.length==0?true:false
    // write code here
}
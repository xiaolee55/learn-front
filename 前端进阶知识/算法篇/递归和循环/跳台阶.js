// 跳三级台阶等于跳两级台阶的跳法+跳一级台阶的跳法。

// 跳四级台阶等于跳三级台阶的跳法+跳二级台阶的跳法。

// 明显也符合斐波那契数列的规律

// f(n) = f(n-1) + f(n-2)

function jumpFloor(n)
{
    if(n<=2){
        return n;
    }
    let i = 2;
    let pre = 1;
    let current = 2;
    let result = 0;
    while(i++ < n){
        result = pre + current;
        pre = current;
        current = result;
    }
    return result;
}
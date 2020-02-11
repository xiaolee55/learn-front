// 1.定义两个栈，一个栈用于存储数据，另一个栈用于存储每次数据进栈时栈的最小值.

// 2.每次数据进栈时，将此数据和最小值栈的栈顶元素比较，如果比栈顶元素小，则进栈，否则不进栈

// 4.数据栈出栈，如果最小值栈顶和数据栈顶相等，则最小值栈也出栈。

// 3.这样最小值栈的栈顶永远是当前栈的最小值

// 例如：data中依次入栈，5,  4,  3, 8, 10, 11, 12, 1
// 则min依次入栈，5,  4,  3，no,no, no, no, 1，依次找次小值，只能找到有限个，并且与入栈元素顺序有关。

let stackData = []
let stackMin = []
function push(node)
{
    stackData.push(node);
    if (stackMin.length ===0 || node <= stackMin[stackMin.length - 1]) {
        stackMin.push(node);
        return;
    }
}
function pop()
{
    if (stackData.length === 0) {
        throw new Error('Your stack is empty!');
    }  
    var result = stackData.pop();
    if (result === stackMin[stackMin.length - 1]) {
        stackMin.pop();
    }
    // write code here
}
function top()
{
    return stackData[stackData.length - 1];
    // write code here
}
function min()
{
    if (stackData.length === 0) {
        throw new Error('Your stack is empty!');
    }  
    return stackMin[stackMin.length - 1];
    // write code here
}
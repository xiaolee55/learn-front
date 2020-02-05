// 如果函数是异步执行的，以上代码就无法保证循环结束后所有数组成员都处理完毕了。如果数组成员必须一个接一个串行处理，则一般按照以下方式编写异步代码：

(function next(i, len, callback) {
    if (i < len) {
        async(arr[i], function (value) {
            arr[i] = value;
            next(i + 1, len, callback);
        });
    } else {
        callback();
    }
}(0, arr.length, function () {
    // All array items have processed.
}));
// 可以看到，以上代码在异步函数执行一次并返回执行结果后才传入下一个数组成员并开始下一轮执行，直到所有数组成员处理完毕后，通过回调的方式触发后续代码的执行。
// 如果数组成员可以并行处理，但后续代码仍然需要所有数组成员处理完毕后才能执行的话，则异步代码会调整成以下形式：

(function (i, len, count, callback) {
    for (; i < len; ++i) {
        (function (i) {
            async(arr[i], function (value) {
                arr[i] = value;
                if (++count === len) {
                    callback();
                }
            });
        }(i));
    }
}(0, arr.length, 0, function () {
    // All array items have processed.
}));
// 可以看到，与异步串行遍历的版本相比，以上代码并行处理所有数组成员，并通过计数器变量来判断什么时候所有数组成员都处理完毕了。
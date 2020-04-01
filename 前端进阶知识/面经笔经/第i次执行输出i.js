

var getNum = (function () {
    let i = 0;
    return function() {
        ++i
        console.log(i);
    }
})();
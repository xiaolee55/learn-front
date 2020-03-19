var compareVersion = function(version1, version2) {
    const arrayA = version1.split('.');
    const arrayB = version2.split('.');

    let pointer = 0;
    while (pointer < arrayA.length && pointer < arrayB.length) {
        const res = arrayA[pointer] - arrayB[pointer];
        if (res === 0) {
            pointer++;
        } else {
            return res > 0 ? 1 : -1;
        }
    }
    // 若arrayA仍有小版本号
    while (pointer < arrayA.length) {
        if (+arrayA[pointer] > 0) {
            return 1;
        } else {
            pointer++;
        }
    }
    // 若arrayB仍有小版本号
    while (pointer < arrayB.length) {
        if (+arrayB[pointer] > 0) {
            return -1;
        } else {
            pointer++;
        }
    }
    // 版本号完全相同
    return 0;
};
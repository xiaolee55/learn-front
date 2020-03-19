var permutation = function(S) {
  let res = []
  backtrack('', S.split('').sort().join(''))
  function backtrack(path, S) {
      if (S === '') {
          return res.push(path)
      }
      for (let i = 0; i < S.length; i++) {  //以字符串中每一个字符为首都做一次遍历，abc，三种头,axx,bxx,cxx
          if (i>0 && S[i-1]=== S[i]) continue  //去重
          path+=(S[i])
          backtrack(path, S.slice(0, i).concat(S.slice(i+1)))
          path = path.slice(0,path.length-1)
      }
      
  }
  return res
};

console.log(permutation("abc"))
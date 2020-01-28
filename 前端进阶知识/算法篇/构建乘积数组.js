/* 给定一个数组A[0,1,...,n-1],请构建一个数组B[0,1,...,n-1],其中B中的元
素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。不能使用除法。*/

//使用矩阵方式解决

function multiply(A) {
  let B =[]
  B.push(1)
  for (let i = 1; i < A.length; i++) {
    B[i] = B[i-1]*A[i-1]
  }
  let tmp=1
  for (let i = A.length-1; i > 0; i--) {
    tmp*=A[i]
    B[i-1]*=tmp
  }
  console.log(B)
}

multiply([1,2,3,4])

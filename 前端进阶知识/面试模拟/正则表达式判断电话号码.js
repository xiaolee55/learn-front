function judgePhoneNumber(str) {
  const regex = /^1[3578]\d{9}$/
  return regex.test(str)
}

const res = judgePhoneNumber("15521043757")
console.log(res);

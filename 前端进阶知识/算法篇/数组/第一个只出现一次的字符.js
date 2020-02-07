
function FirstNotRepeatingChar(str) {
  const map = {}
  for (let i = 0; i < str.length; i++) {
    map[str[i]] ? map[str[i]]++ : map[str[i]] = 1
  }
  for (let i = 0; i < str.length; i++) {
    if (map[str[i]] === 1) {
      return i;
    }
  }
  return -1;
}

const res = FirstNotRepeatingChar('abscslsdfdsa')

console.log(res);

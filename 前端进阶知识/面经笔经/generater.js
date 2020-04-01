function *test() {
  yield new Promise((resolve)=>{resolve(1)}).then(setTimeout(() => {
    console.log(1)
  }, 1000))
  yield console.log(2)
  return 3
}
 const fun = test()

fun.next()
fun.next()
fun.next()

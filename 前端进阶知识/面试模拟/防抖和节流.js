function debounce(fn,wait) {
  let timeout =  null
  return function(){
    const event = arguments
    const context = this
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.call(context,event)
    }, wait);
  }
}

function throttle(fn,wait) {
  let timeout = null

  return function() {
    if(timeout) return
    const context = this
    const e = arguments
    timeout = setTimeout(() => {
      fn.call(context,e)
      timeout = null
    }, wait);
  }
}
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
  const that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallbacks = []  //待执行正确事件队列
  that.rejectedCallbacks = []  //待执行错误事件队列
  function resolve(value) {
    if(that.state === PENDING) {
      that.state = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb=>cb(that.value))
    }
  }
  function reject(value) {
    if(that.state === REJECTED) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }
  }
  try {
    fn(resolve,reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onFulfilled,onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function'?onFulfilled:v=>v
  onRejected = typeof onRejected === 'function'?onRejected:r=>{throw r}
  if(that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {    
    onFulfilled(that.value)  
  } 
  if(that.state === REJECTED) {
    onRejected(that.value)
  }
}

new MyPromise((resolve,reject)=>{
  setTimeout(() => {
    resolve(1)
  }, 0);
}).then(value=>{
  console.log(value)
})
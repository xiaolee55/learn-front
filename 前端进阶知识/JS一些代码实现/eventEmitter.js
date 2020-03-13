
function EventEmitter() {
  this._maxListeners = 10   //监听器限制数量
  this._events = Object.create(null)  //存储事件的对象，键为事件名，值为绑定的事件数组
}

//向事件队列添加事件
//prepend为true表示向事件队列头部添加事件
EventEmitter.prototype.addListener = function (type, listener, prepend) {
  if(!this._events) {    //如果函数中不存在事件对象，则新建一个
    this._events = Object.create(null)
  }
  if(this._events[type]) {   //如果已经注册过该事件，则把新触发函数放进待执行数组
    if(prepend) {     //表示是把事件插在队列头还是队列尾
      this._events[type].unshift(listener)
    } else {     
      this._events[type].push(listener)
    }
  } else {     //还没有注册过该类事件，第一次注册
    this._events[type] = [listener]
  }
}

//移除某个事件
EventEmitter.prototype.removeListener = function(type,listener) {
  if(Array.isArray(this._events[type])) {    //如果该事件对应的值是一个数组，即表示该事件已经被注册过，才能进行删除操作，否则退出
    if(!listener) {       //如果没有指明要删除哪个函数，则把整个事件都删除
      delete this._events[type]
    } else {  //否则删除指定的函数（订阅者）
      this._events[type] = this._events[type].filter(e => e!== listener && e.origin !== listener)
    }
  }
}

//向事件队列添加事件，只执行一次
EventEmitter.prototype.once = function (type,listener) {
  const only = (...args) => {   //执行一次就移除该事件
    listener.apply(this,args)
    this.removeListener(type,listener)
  }
  only.origin = listener       //标记他为once类型的事件 
  this.addListener(type,only)   
}

//触发事件
EventEmitter.prototype.emit = function (type, ...args) {
  if(Array.isArray(this._events[type])) {
    this._events[type].forEach(fn => {
      fn.apply(this, args)
    })
  }
}

//设置最大事件监听个数
EventEmitter.prototype.setMaxListeners = function (count) {
  this.maxListeners = count
}

// ----------------------------------------
var emitter = new EventEmitter();

var onceListener = function (args) {
  console.log('我只能被执行一次', args, this);
}

var listener = function (args) {
  console.log('我是一个listener', args, this);
}

emitter.once('click', onceListener);
emitter.addListener('click', listener);

// emitter.emit('click', '参数');
// emitter.emit('click');

// emitter.removeListener('click', listener);
// emitter.emit('click');
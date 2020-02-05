/* parent.js */
var child = child_process.spawn('node', [ 'child.js' ], {
  stdio: [ 0, 1, 2, 'ipc' ]
});

child.on('message', function (msg) {
console.log(msg);
});

child.send({ hello: 'hello' });

/* child.js */
process.on('message', function (msg) {
msg.hello = msg.hello.toUpperCase();
process.send(msg);
});

// 可以看到，父进程在创建子进程时，在options.stdio字段中通过ipc开启了一条IPC通道，之后就可以监听子进程对象的message事件接收来自子进程的消息，
// 并通过.send方法给子进程发送消息。在子进程这边，可以在process对象上监听message事件接收来自父进程的消息
// ，并通过.send方法向父进程发送消息。数据在传递过程中，会先在发送端使用JSON.stringify方法序列化，再在接收端使用JSON.parse方法反序列化。
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var str = bin.toString('utf-8'); // => "hello"
var bin2 = new Buffer('hello', 'utf-8'); // => <Buffer 68 65 6c 6c 6f>

console.log(bin,str,bin2)

//字符串是只读的，对原字符串做修改得到的都是新字符串
//Buffer可以使用[index]的方式直接修改某个位置的字节,同样.slice方法也会修改原Buffer

bin[0] = 0x11
console.log(bin[0])

var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);
console.log(bin)

//也因此，如果想要拷贝一份Buffer，得首先创建一个新的Buffer，
//并通过.copy方法把原Buffer中的数据复制过去。这个类似于申请一块新的内存，并把已有内存中的数据复制过去。以下是一个例子。
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;    //没有修改原值
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>
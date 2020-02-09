//测试webpack对JS的打包效果
//  import a from './a.js'
//  import b from './b.js'

//测试CSS-loader的modules属性
//  import createAvatar from './avatar.js'
//  import ava from './pic.jpg'
//  import style from './avatar.css'  //只有类名能作为键
//  import  './index.css'
 
//  console.log(style);
 
//  createAvatar()
//  var img = new Image()
//  img.src = ava
//  img.classList.add(style.avatar)

//  var root = document.getElementById('root')
//  root.append(img)

//  console.log('s实时sss更新',a,b,ava.default);
 
//测试HMR对css的效果（非刷新状态，因为DevServer会刷新页面）
// import './testHMR.css';
// var btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);

// btn.onclick = function() {
// 	var div = document.createElement('div');
// 	div.innerHTML = 'item';
// 	document.body.appendChild(div);
// }

//测试HMR对JS的效果,CSS改变时HMR默认会重新加载CSS，但不会重新加载JS，所以自己要根据自己的需求重载对应的JS
// import counter from './testHMRToJS1'
// import number from './testHMRToJS2'

// counter()
// number()

// if(module.hot) {  //如果对应JS发生了改变，则执行里面的逻辑
// 	module.hot.accept( "./testHMRToJS2", () => {
// 		document.body.removeChild(document.getElementById('number'));
// 		number();
// 	})
// }


//测试babel对ES6语法的处理
// import '@babel/polyfill'   //弥补一些低版本浏览器没有的语法，比如promise，这会使得文件大小增加很多,会污染全局对象
// const arr = [
// 	new Promise(() => {}),
// 	new Promise(() => {})
// ]

// arr.map(item => {
// 	console.log(item)
// })
 
//测试TreeShaking,TreeShaking就是用到的代码才打包，没用到的不需要打包，比如math.js中的minus方法
//只支持ES Module的引入方式，不支持require之类，因为只有ES Module底层是静态引入
// import {add} from './math.js'


// const a = 1
// console.log(a);
// console.log(add(1,7));

//测试code spliting
//问题描述：如果引入其他库，那么会一起打包到main.js，导致JS文件很大，加载很慢，且业务逻辑变化时需要重新加载所有内容
//解决1：main.js被拆分成lodash.js和main.js，当业务代码改变时，用户只需要重新加载main.js，不必加载lodash
//解决2：使用webpack自带的splitChunks实现自动打包

// import _ from 'lodash'
// console.log(_.join(['a','b','c'],'***'));

//解决3：异步加载的代码，需要在babel中引入@babel/plugin-syntax-dynamic-import插件
// function getComponent() {
//   //下面这句注释叫魔法注释，可以设置这个导入包的名称
//   return import(/*webpackChunkName:"lodash"*/'lodash').then(({default: _}) => {
//     var element = document.createElement(div)
//     element.innerHTML = _.join('LEE',"man",'-')
//     return element
//   })
// }
// getComponent().then(element =>{
//   document.body.appendChild(element)
// })

//测试cacheGroups中的default属性
// import {test} from './testSplitChunks'
// test()

//测试优先级priority对打包的影响，看两个条件都满足的情况下jQuery会走vendors还是default
// import _ from 'lodash'
// import jquery from 'jquery'

//懒加载学习
//懒加载就是通过异步import的形式去加载某个模块，但是模块什么时候加载是不确定的
async function getComponent() {
  // webpackPrefetch:true表示当网络有空闲的时候就把脚本预先加载好，如果不加这个的话就是等到点击才会去加载这个脚本，提高代码利用率，解决懒加载带来的用户体验问题
  //还有一个webpackPreLoad:true，是和主文件一起加载的
  const {default:_} = import(/*webpackPrefetch:true*/'lodash')
  const element = document.createElement('div')
  element.innerHTML = _.join('LEE',"man",'-')
  return element
}

document.addEventListener('click',() => {
  getComponent().then(element =>{
    document.body.appendChild(element)
  })
})
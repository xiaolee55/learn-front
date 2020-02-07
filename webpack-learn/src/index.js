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
import counter from './testHMRToJS1'
import number from './testHMRToJS2'

counter()
number()

if(module.hot) {  //如果对应JS发生了改变，则执行里面的逻辑
	module.hot.accept( "./testHMRToJS2", () => {
		document.body.removeChild(document.getElementById('number'));
		number();
	})
}
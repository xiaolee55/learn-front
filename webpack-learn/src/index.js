 import a from './a.js'
 import b from './b.js'
 import createAvatar from './avatar.js'
 import ava from './pic.jpg'
 import style from './avatar.css'  //只有类名能作为键
 import  './index.css'
 
 console.log(style);
 
 createAvatar()
 var img = new Image()
 img.src = ava
 img.classList.add(style.avatar)

 var root = document.getElementById('root')
 root.append(img)

//  console.log(a,b,ava.default);
 

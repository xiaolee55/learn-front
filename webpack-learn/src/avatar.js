// 为了学习modules属性


import ava from './pic.jpg'   //import导入图片是图片的名称，而require导入的是一个对象
// console.log(ava);

function createAvatar() {
  var img = new Image()
 img.src = ava
 img.classList.add('avatar')

 var root = document.getElementById('root')
 root.append(img)
}

export default createAvatar
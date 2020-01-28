{
  // 基本定义
  let ajax=function(callback){
    console.log('执行');
    setTimeout(function () { 
      callback&&callback.call()
    }, 1000);
  };
  ajax(function(){
    console.log('timeout1');
  })
}

{
  let ajax=function(){
    console.log('执行2');
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };

  // then中第一个函数对应resolve，第二个函数对应reject
  ajax().then(function(){
    console.log('promise','timeout2');
  })
}

{
  let ajax=function(){
    console.log('执行3');
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };
//每次执行resolve之后继续返回Promise，再then，then就是Promise对象的方法，then对应的是resolve方法
  ajax()
    .then(function(){
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve()
      }, 2000);
    });
  })
    .then(function(){
    console.log('timeout3');
  })
}

{
  let ajax=function(num){
    console.log('执行4');  
    return new Promise(function(resolve,reject){
      if(num>5){
        resolve()
      }else{
        throw new Error('出错了')
      }
    })
  }

  ajax(6).then(function(){
    console.log('log',6);
  }).catch(function(err){
    console.log('catch',err);
  });

  ajax(3).then(function(){
    console.log('log',3);
  }).catch(function(err){
    console.log('catch',err);
  });
}

{
  // 所有图片加载完再加载页面
  function loadingImg(src) {
    return new Promise((resolve,reject)=>{
      let img=document.createElement('img');
      img.src=src;
      img.onload=function() {
        resolve(img);
      }
      img.onerror=function(err) {
        reject(err);
      }
    })
  }

  function showImgs(imgs) {
    imgs.forEach(function(imgs) {
        document.body.appendChild(img)
    })
  }

  Promise.all([       //all方法表示里面的函数都执行完之后再返回一个Promise对象再执行then
    loadingImg(),
    loadingImg(),
    loadingImg()  
  ]).then(showImgs())

  {
    //有一个图片加载完就添加到页面
    function loadingImg(src) {
      return new Promise((resolve,reject)=>{
        let img=document.createElement('img');
        img.src=src;
        img.onload=function() {
          resolve(img);
        }
        img.onerror=function(err) {
          reject(err);
        }
      })
    }

    function showImgs(img) {
      let p=document.createElement('p'); 
      p.appendChild(img)
      document.body.appendChild(p)
    }
    Promise.all([       //有一个返回Promise就执行then，其他的不执行
      loadingImg(),
      loadingImg(),
      loadingImg()  
    ]).then(showImgs())
  }
}
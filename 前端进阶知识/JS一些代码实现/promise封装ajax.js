
function ajax(data){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest()
    xhr.open()
    xhr.send(data)
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4){
        const status = xhr.status
        if(status>=200&&status<300){
          resolve(xhr.responseText)
        }else{
          reject(status)
        }
      }
    }
  })
}

ajax({a:1}).then().catch()
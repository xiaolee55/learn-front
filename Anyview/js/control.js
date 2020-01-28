let topicTitle=document.getElementById("topicTitle");
let topicContent=document.getElementById("topicContent");
let e1=document.getElementById("e1");
let e2=document.getElementById("e2");
let show=document.getElementById("show");
let edHead=document.getElementById("edHead");
let edHead_child=edHead.getElementsByTagName('div');
let nowTitle=edHead_child[0];
let stack=document.getElementById("stack");
let visual=document.getElementById("visual");
let openList=document.getElementById("openList");
let title=topicTitle.getElementsByTagName("a");
let toolBar=document.getElementById("toolBar");
let toolBarList=document.getElementById("toolBarList");
let handleBar=document.getElementById("handleBar");
let record=4;

//操作栏长度自适应
handleBar.style.length=topicContent.offsetWidth+"px";

//弹出工具栏
toolBar.onclick=function(){
    if(toolBar.style.right==0||toolBar.style.right==0+"px"){
        toolBar.style.right="120"+"px";
        toolBarList.style.right=0;
    }
    else{
        toolBar.style.right=0;
        toolBarList.style.right="-120"+"px";
    }
    console.log(toolBar.style.right);
    
}

//使用切换类名的方式更改题目状态,有已完成，未完成，未开始三种状态
for(let i=0;i<title.length;i++){
    if(i%4==0)
        title[i].classList.add("correct");
    else if(i%5==0)
        title[i].classList.add("error");
}

//点击题目栏的题目，更改内容区以及已打开题目区
topicTitle.onclick=function(){
    if(edHead.childNodes.length>14)
        return;
    console.log(edHead.childNodes.length);
    
   let newDiv=document.createElement("div");
   let newSpan=document.createElement("span");
   let newI=document.createElement("i");
   newDiv.id="t"+record++;
   for(let i=0;i<edHead.childNodes.length;i++){
       if( edHead.childNodes[i].className=="thisTitle"){       
         edHead.childNodes[i].className="";
        }
   }
   newDiv.className="thisTitle";
   newSpan.className="editor-span";
   newSpan.innerText=event.target.innerText;
   newI.className="editor-i";
   newI.innerText="X";
   newDiv.appendChild(newSpan);
   newDiv.appendChild(newI);
   edHead.appendChild(newDiv); 
}


//管理所有打开题目的状态
edHead.onclick=function(){
    if(event.target.tagName=="DIV")
     return;
    //点击X时删除当前题目
    if(event.target.className=="editor-i"){       
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
      return;
    }
    //切换题目
    if(event.target.parentNode.id!=nowTitle.id){
        event.target.parentNode.className="thisTitle";
        nowTitle.className="";
        nowTitle=event.target.parentNode;
    }
}
//控制题目列表伸缩
openList.onclick=function(){
    if(topicTitle.offsetLeft==0){
        topicTitle.style.left=-topicTitle.offsetWidth+"px"; 
        e1.style.backgroundColor='#F5F5F5';
        e2.style.backgroundColor='#F5F5F5';
        topicContent.style.backgroundColor='rgba(255,255,255,1)';

    } 
    else{
        topicTitle.style.left=0;
        e1.style.backgroundColor='rgba(0,0,0,0)';
        e2.style.backgroundColor='rgba(0,0,0,0)';
        topicContent.style.backgroundColor='rgba(0,0,0,0.5)'  
    }
}


//嵌入ACE编辑器
let editor = ace.edit("edMain");
editor.setTheme("ace/theme/katzenmilch");
editor.setFontSize(16);
editor.getSession().setMode("ace/mode/c_cpp");
let languageTools=ace.require("ace/ext/language_tools");
             editor.setOptions({
                     enableBasicAutocompletion: true,
                     enableSnippets: true,
                    enableLiveAutocompletion: true
                });
                languageTools.addCompleter({
                    getCompletions: function(editor, session, pos, prefix, callback) {
                    callback(null,  [
                    {
                    name : "include",
                    value : "include",
                    meta: "keywordControls",
                    score : 1000 // 让test排在最上面
                    }
                    ]);
                    }
                    });


let ace_layer=document.querySelector(".ace_layer");

//单击增加断点
ace_layer.onclick=function(){
    if(event.target.className.includes("ace_layer"))
      return;
    event.target.id="line"+event.target.innerText;
    event.target.classList.add("breakPoint")
    outIn.value+="行号："+event.target.innerText+"\n";
}
//双击取消断点
ace_layer.ondblclick=function(){
    if(event.target.className.includes("breakPoint"))
    event.target.classList.remove("breakPoint");
}




//处理编译，运行，调试的数据交互
let compile=document.getElementById("compile");
let run=document.getElementById("run");
let debug=document.getElementById("debug");
let outIn=document.getElementById("outIn");
let code=document.querySelector(".ace_content");
let text;

//封装ajax
function ajax(type,content){
    let xhr=new XMLHttpRequest();
    xhr.open("POST","http://localhost:13337/",false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            console.log(xhr.responseText);
           text=xhr.responseText;
        }
    }
    xhr.send(JSON.stringify({type:type,content:content}));
}
compile.onclick=function(){
    ajax("compile",code.innerText);
    outIn.value+=text;
}
run.onclick=function(){
    ajax("run",code.innerText);
    outIn.value+=text;
}
// debug.onclick=function(){
//     let lineSign=document.querySelector(".ace_gutter-active-line").innerText;
//     ajax("debug",code.innerText);
//     outIn.value+=text+"行号为"+editor.session.getLength();
// }

//分割平面
Split(['#topicContent','#show'], {
    sizes: [20,80],
    minSize: 10,
    cursor: "w-resize"
});  
Split(['.editor', '.stack', '.visual'], {
    sizes: [80,10,10],
    minSize: 0,
    snapOffset: 20,
    gutterSize: 5,
    cursor: "w-resize"
});  
Split(['.head','.out-in'], {
    direction: 'vertical',
    sizes: [95,5],
    cursor: "s-resize"
});  
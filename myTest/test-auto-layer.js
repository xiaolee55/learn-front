
var tt=document.getElementById("tt");
var show=document.getElementById("show");
var ttc=document.getElementById("ttc");
var compile=document.getElementById("compile");
var run=document.getElementById("run");
ttc.onclick=function(){
        ttc.style.display="none";
}
run.onclick=function(){
        ttc.style.display="";
}
tt.onclick=function(){
        tt.style.display="none";
        show.style.marginLeft=0;
        ttc.style.marginLeft=0;
}
compile.onclick=function(){
        tt.style.display="";
        show.style.marginLeft=210+"px";
}
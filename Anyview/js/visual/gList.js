

/**
 * g型
 * @param nowData
 * @param beforeData
 * @returns
 */
function gList(nowData,beforeData){
    
    var actionSet = document.getElementById("actionSet").innerHTML;     //取得操作区内容
    var action = JSON.parse(actionSet);     //转化为json对象
    var changeId=action.changeId;		//确定改变的节点
    var nextId=action.nextId;		//确定改变节点的next指针
    var index=-1;				//定义序号
    var row=-1;				//定义行数
    var x1,y1;		//起点
    var x2,y2;
    var x3,y3;
    var x4,y4;		//终点
    

    //确定曲线位置
   x1=Number(getXLocat(changeId,nowData))+rectWidth+nextWidth;
   x2=Number(getXLocat(nextId,nowData));
   y1=Number(getYLocat(changeId,nowData))+rectHeight/2;
   y2=y1;
   x3=Number(x1)-20;
   y3=Number(y1)-80;
   x4=Number(x2)+20;
   y4=Number(y1)-80;
   
   //路径
   var path_1="M"+x1+","+y1+"C"+x1+","+y1+" "+x1+","+y1+" "+x1+","+y1;
   var path_2="M"+x1+","+y1+"C"+x3+","+y3+" "+x4+","+y4+" "+x2+","+y2;
   
    
   //添加曲线
 svg.append("path")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow)")
    .attr("id", function() {
        return "path" + action.changeId;
    })
    .attr("d",path_1)
    
    .transition()
    .duration(drawTime)
    .attr("stroke", "black")
    .attr("fill","none")
    .attr("d",path_2);
 
 svg.select("#textNext"+changeId)
    .transition()
    .duration(drawTime)
    .text(nextId);


    

}

function yList(nowData,beforeData){
	
	 /*
     * 函数需要做的事：
     * 附加一个箭头直线，由改变结点位置到它next域结点的位置
     * */

	var test3 = document.getElementById("test3");	//取得测试区id
	test3.innerHTML  =  "我能做y结构";


    var actionSet = document.getElementById("actionSet").innerHTML;		//取得操作区内容
    var action = JSON.parse(actionSet);		//转化为json对象
    
    var x1,y1;		//起点
    var x2,y2;
    var x3,y3;
    var x4,y4;		//终点
    
//确定曲线位置
    x1=Number(getXLocat(action.changeId,nowData))+rectWidth+nextWidth;
    x2=Number(getXLocat(action.nextId,nowData));
    y1=Number(getYLocat(action.changeId,nowData))+rectHeight/2;
    y2=Number(getYLocat(action.nextId,nowData))+rectHeight/2;
    x3=(2*x1+x2)/3;
    y3=(2*y1+y2)/3;
    x4=(2*x2+x1)/3;
    y4=(2*y2+y1)/3;
    
    //路径
    var path_start="M"+x1+","+y1+"C"+x1+","+y1+" "+x1+","+y1+" "+x1+","+y1;
    var path_end="M"+x1+","+y1+"C"+x3+","+y3+" "+x4+","+y4+" "+x2+","+y2;
    


 svg.append("path")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow)")
    .attr("id", function() {
        return "path" + action.changeId;
    })
    .attr("d",path_start)
    
    .transition()
    .duration(drawTime)
    .attr("stroke", "black")
    .attr("fill","none")
    .attr("d",path_end);
 svg.select("#textNext"+action.changeId)
    .transition()
    .duration(drawTime)
    .text(action.nextId);

}
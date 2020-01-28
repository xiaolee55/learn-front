

/**
 * 循环
 * @param nowData
 * @param beforeData
 * @returns
 */
function loopList(nowData,beforeData){

    var test3 = document.getElementById("test3");   //取得测试区id
    test3.innerHTML  =  "我能执行循环";
    var actionSet = document.getElementById("actionSet").innerHTML;     //取得操作区内容
    var action = JSON.parse(actionSet);     //转化为json对象

    //确定始末位置
    var startXLocat=Number(getXLocat(action.changeId,nowData))+rectWidth+nextWidth;
    var startYLocat=Number(getYLocat(action.changeId,nowData))+(rectHeight/2);
    
    //曲线路径
    var path_1="M"+startXLocat+","+startYLocat+" C"+startXLocat+","+startYLocat+" "+startXLocat+","+startYLocat+" "+startXLocat+","+startYLocat;
    var path_2="M"+startXLocat+","+startYLocat+" C"+(startXLocat-2*rectWidth)+","+(startYLocat-100)+" "+(left+2*rectWidth)+","+(startYLocat-100)+" "+left+","+startYLocat ;

    //附加新指针
    svg.append("path")
        .attr("fill","none" )
	    .attr("stroke","black")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow)")
        .attr("id", function() {
            return "path" + action.changeId;
        })  
        .attr("d",path_1)
        .transition()
        .duration(drawTime)
        .attr("stroke", "black")
        .attr("d",path_2)
        svg.select("#textNext"+action.changeId)
        .transition()
        .duration(drawTime)
        .text(action.nextId);

   

}
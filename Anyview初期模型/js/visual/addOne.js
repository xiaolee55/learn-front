/*
 *第一次输出是有两种情况，
 *一种是增加一个量链表节点
 *另一种是直接传入多节点，那么重绘 
 */

/*
 * 增加一个节点有两种情况
 * 新增链表的节点
 * 在原有链表的基础上增加一个节点
 */
function addOne(nowData,beforeData,action){
	svg=d3.select("svg");
	for(var i = 0; i < nowData.length; i++){
   	   
		for(var j = 0; j < nowData[i].length; j++){
   		   
   		   if(clearMaoHao(nowData[i][j].nextId) == (action.changeId)){
   			   
   			  addOneNotForNewList(nowData,beforeData,action,i,j+1);
   			  return;//跳出函数
   		   }
   	   
		}
		
	}  
	
	addOneForNewList(nowData,beforeData);
}

function addOneNotForNewList(nowData,beforeData,action,numberY, numberX){
	//画矩形 画线
	for(var k=0;k<nowData.length;k++){
		
		 for(var i = 0; i < nowData[k].length; i++){
			 
			  if(clearMaoHao(nowData[k][i].id)==(action.changeId)){
				  //父节点id
				  var aimId =  clearMaoHao(nowData[k][i].mainPrior)
			  }
		 }
		 
	}
	//如果新增节点不在泄漏区
		 write_simpleRect((action.changeId),numberX,numberY,action.dataText)
		 draw_line(aimId,transform(numberY,numberX-1,numberY+1,numberX,"line"));
		 move_line(aimId,transform(numberY,numberX-1,numberY,numberX,"line"),drawTime)
	
}

function addOneForNewList(nowData,beforeData){

    var actionSet = document.getElementById("actionSet").innerHTML;		//取得操作区内容
    var action = JSON.parse(actionSet);		//转化为json对象

    if(beforeData != null){
        drawHeight = beforeData.length;
    }else{
        drawHeight = 0;
    }


    //数据域矩形
    var rectD = svg.append("rect")
        .attr("fill", "white")
        .transition()
        .duration(drawTime)
        .attr("y", function(){
            return (drawHeight + 2) * listPadding;
        })
        .attr("x" , function() {
            return left;
        })
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("fill", color.data)
        .attr("id", "rect" + (action.changeId));
    
    rectD.transition()
        .duration(drawTime)
        .attr("y", (drawHeight + 1) * listPadding);
    

    //next域矩形
    var rectN = svg.append("rect")
        .attr("fill", "white")
        .attr("stroke", "white")
        .transition()
        .duration(drawTime)
        .attr("y", function(){
            return (drawHeight + 2) * listPadding;
        })
        .attr("x" , function() {
            return left + rectWidth;
        })
        .attr("width", nextWidth)
        .attr("height", rectHeight)
        .attr("fill", color.next)
        .attr("stroke", color.stroke)
        .attr("id", "rectNext" + (action.changeId));
    
    rectN.transition()
        .duration(drawTime)
        .attr("y", (drawHeight + 1) * listPadding);
    

    //数据域内容
    var textD = svg.append("text")
        .attr("fill", "white")
        .transition()
        .duration(drawTime)
        .attr("y", (drawHeight + 2) * listPadding + rectHeight/2)
        .attr("x",function(){
            return left + rectWidth/3;
        })
        .attr("fill", color.text)
        .text(action.dataText)
        .attr("id", "text" + (action.changeId));
    
    textD.transition()
        .duration(drawTime)
        .attr("y", (drawHeight + 1) * listPadding + rectHeight/2);
  
}


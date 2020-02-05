function leftSubtreeException(nowData,beforeData,action){
	//画布添加异常线
	startX= Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("x")-(nextWidth/2));
	startY= Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("y")-(-rectHeight/2));
	endX  = Number(document.getElementById("rect"+clearMaoHao(node(nowData,clearMaoHao(action.changeId)).letfChild)).getAttribute("x")-(-rectWidth/2))
    endY  = Number(document.getElementById("rect"+clearMaoHao(node(nowData,clearMaoHao(action.changeId)).letfChild)).getAttribute("y"))
    var path_start="M"+startX+","+startY+"C"+startX+","+startY+" "+startX+","+startY+" "+startX+","+startY;
	var path_end="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;
	svg.append("path")
	 .attr("d",path_start)
	 .attr("stroke-width","1.5")
	 .attr("stroke","red")
	 .attr("marker-end","url(#arrow)")  //区分出异常线才能删除
	.attr("id", "path" + clearMaoHao(action.changeId)+clearMaoHao( node(nowData,clearMaoHao(action.changeId)).letfChild))
	.transition()              
	.duration(drawTime)
	.attr("d",path_end)
	//记录异常线
	exceptionLineArray[elCount++]=clearMaoHao(action.changeId)+clearMaoHao( node(nowData,clearMaoHao(action.changeId)).letfChild)
}
function rightSubtreeException(nowData,beforeData,action){
	startX= Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("x")-(-rectWidth-nextWidth/2));
	startY= Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("y")-(-rectHeight/2));
	endX  = Number(document.getElementById("rect"+clearMaoHao(node(nowData,clearMaoHao(action.changeId)).rightChild)).getAttribute("x")-(-rectWidth/2))
    endY  = Number(document.getElementById("rect"+clearMaoHao(node(nowData,clearMaoHao(action.changeId)).rightChild)).getAttribute("y"))
    var path_start="M"+startX+","+startY+"C"+startX+","+startY+" "+startX+","+startY+" "+startX+","+startY;
	var path_end="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;
	svg.append("path")
	 .attr("d",path_start)
	 .attr("stroke-width","1.5")
	 .attr("stroke","red")
	 .attr("marker-end","url(#arrow)")  //区分出异常线才能删除
	.attr("id", "path" + clearMaoHao(action.changeId)+ clearMaoHao( node(nowData,clearMaoHao(action.changeId)).rightChild))
	.transition()              
	.duration(drawTime)
	.attr("d",path_end)
	//记录异常线
	exceptionLineArray[elCount++]=clearMaoHao(action.changeId)+clearMaoHao( node(nowData,clearMaoHao(action.changeId)).rightChild)

}
//addone异常
function leftExceptionLine(id1,id2){
	var startX= Number(document.getElementById("rect"+id1).getAttribute("x")-(-rectWidth-nextWidth/2));
	var startY= Number(document.getElementById("rect"+id1).getAttribute("y")-(-rectHeight/2));
	var endX  = Number(document.getElementById("rect"+id2).getAttribute("x")-(-rectWidth/2))
    var endY  = Number(document.getElementById("rect"+id2).getAttribute("y"))
    var path_start="M"+startX+","+startY+"C"+startX+","+startY+" "+startX+","+startY+" "+startX+","+startY;
	var path_end="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;
	svg.append("path")
	 .attr("d",path_start)
	 .attr("stroke-width","1.5")
	 .attr("stroke","red")
	 .attr("marker-end","url(#arrow)")  //区分出异常线才能删除
	.attr("id", "path" + id1+ id2)
	.transition()              
	.duration(drawTime)
	.attr("d",path_end)
	
}
function rightExceptionLine(id1,id2){
	var startX= Number(document.getElementById("rect"+id1).getAttribute("x")-(-rectWidth-nextWidth/2));
	var startY= Number(document.getElementById("rect"+id1).getAttribute("y")-(-rectHeight/2));
	var endX  = Number(document.getElementById("rect"+id2).getAttribute("x")-(-rectWidth/2))
    var endY  = Number(document.getElementById("rect"+id2).getAttribute("y"))
    var path_start="M"+startX+","+startY+"C"+startX+","+startY+" "+startX+","+startY+" "+startX+","+startY;
	var path_end="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;
	svg.append("path")
	 .attr("d",path_start)
	 .attr("stroke-width","1.5")
	 .attr("stroke","red")
	 .attr("marker-end","url(#arrow)")  //区分出异常线才能删除
	.attr("id", "path" + id1+ id2)
	.transition()              
	.duration(drawTime)
	.attr("d",path_end)
	
}
//判断目标线是不是异常线
function isExceptionLine(id1,id2){
	var temp=id1+id2;
	for(var i=0;i<exceptionLineArray.length;i++){
		if(temp==exceptionLineArray[i]){
			return true;
		}
	}
	return false;
}/*
//删除数组中的不再异常的线
function delectExceptionLine(id1,id2){
	var temp=id1+id2;
	for(var i=0;i<exceptionLineArray.length;i++){
		if(temp==exceptionLineArray[i]){
			exceptionLineArray.splice(i,1)
		}
	}
}*/
/*
//返回异常线的父亲
function returnExceptionLineF(id2){
	for(var i=0;i<nowData.length;i++){
		for(var j=0;j<nowData[i].length;j++){
			if(isExceptionLine(clearMaoHao(nowData[i][j].id),id2))
			return clearMaoHao(nowData[i][j].id);
		}
	}
		
}*/
//传带冒号的id 删除异常线
function delectExceptionLine(id1,id2){
	d3.select("#path"+clearMaoHao(id1)+ clearMaoHao(id2))
	  .transition()
	  .duration(drawTime)
	  .attr("stroke","white")
	  .remove()
}

//传带冒号的id 修改异常线
function changeExceptionLine(id1,id2){
	d3.selectAll("#path"+clearMaoHao(id1)+ clearMaoHao(id2))
	  .transition()
	  .duration(drawTime)
	  .attr("stroke","black")
}/*
//传带冒号的id 删除正常线
function changeNormalLine(id1,id2){
	
	d3.select("#path"+clearMaoHao(id1)+ clearMaoHao(id2))
	  .attr("stroke","white")
	  //因为后面校总会重新用到这个id 所以不能删除
}*/
function isHaveDelect(array,id){
	for(var i=0;i<array.length;i++){
		if(id==array[i]) return true;
	}
	return false;
}
//传带冒号的id 删除整个树节点
function delectTreeNode(id){
	var delectLine=new Array()
	var count=0;
	d3.select("#rect"+ clearMaoHao(id))
	  .transition()
	  .duration(drawTime)
	  .attr("fill", "white")
	  .attr("stroke","white")
	  .remove()
  d3.select("#rectR"+ clearMaoHao(id))
   .transition()
	  .duration(drawTime)
	  .attr("fill", "white")
	  .attr("stroke","white")
	  .remove()
  d3.select("#rectL"+ clearMaoHao(id))
   .transition()
	  .duration(drawTime)
	  .attr("fill", "white")
	  .attr("stroke","white")
	  .remove()
var nowbaba=node(beforeData,clearMaoHao(id)).parent
								
  d3.select("#path"+clearMaoHao(nowbaba)+ clearMaoHao(id))
	 .transition()
	  .duration(drawTime)
	  .attr("stroke","white")
	  .remove()
  d3.select("#text"+ clearMaoHao(id))
   .transition()
	  .duration(drawTime)
	  .attr("stroke","white")
	  .remove()
	  if(node(beforeData,clearMaoHao(id)).letfChild!=""){
	    	//原不为空 现在节点不在则是找不到了
	    	if(/*node(beforeData,clearMaoHao(id)).depth<node(beforeData,clearMaoHao(node(beforeData,clearMaoHao(id)).letfChild)).depth&&*/!isHaveNode(nowData,clearMaoHao(node(beforeData,clearMaoHao(id)).letfChild))){
				delectTreeNode(node(beforeData,clearMaoHao(id)).letfChild);
				
	    	}
	    	/*if(node(beforeData,clearMaoHao(id)).depth>=node(beforeData,clearMaoHao(node(beforeData,clearMaoHao(id)).letfChild)).depth&&!isHaveNode(nowData,clearMaoHao(node(beforeData,clearMaoHao(id)).letfChild))){
	    		delectExceptionLine(id,node(beforeData,clearMaoHao(id)).letfChild)
	    	}*/
	    	//原不为空 现在节点还找得到:有异常或者根节点
	    	if(isHaveNode(nowData,clearMaoHao(node(beforeData,clearMaoHao(id)).letfChild))){
				delectExceptionLine(node(beforeData,clearMaoHao(id)).id , node(beforeData,clearMaoHao(id)).letfChild);
				var nowbaba=node(nowData,clearMaoHao(node(beforeData,clearMaoHao(id)).letfChild)).parent
				changeExceptionLine(nowbaba,node(beforeData,clearMaoHao(id)).letfChild);
	    	}
	     }
	  if(node(beforeData,clearMaoHao(id)).rightChild!=""){
			//原不为空 现在节点不在则是找不到了
			if(node(beforeData,clearMaoHao(id)).depth<node(beforeData,clearMaoHao(node(beforeData,clearMaoHao(id)).rightChild)).depth&&!isHaveNode(nowData,clearMaoHao(node(beforeData,clearMaoHao(id)).rightChild))){
				delectTreeNode(node(beforeData,clearMaoHao(id)).rightChild);
			    
			}
			if(node(beforeData,clearMaoHao(id)).depth>=node(beforeData,clearMaoHao(node(beforeData,clearMaoHao(id)).rightChild)).depth&&!isHaveNode(nowData,clearMaoHao(node(beforeData,clearMaoHao(id)).letfChild))){
				delectExceptionLine(id,node(beforeData,clearMaoHao(id)).rightChild)
				
	    	}
	    	//原不为空 现在节点还找得到:有异常或者根节点
	    	if(isHaveNode(nowData,clearMaoHao(node(beforeData,clearMaoHao(id)).rightChild))){
	    		delectExceptionLine(node(beforeData,clearMaoHao(id)).id , node(beforeData,clearMaoHao(id)).rightChild);
			    
		    }
	     }
	  
}

function delectLine(){
	for(var i=0;i<nowData.length;i++){
		for(var j=0;j<nowData[i].length;j++){
		   if(nowData[i][j].parent==""){
				d3.select("#path"+clearMaoHao(beforeData[i][j].parent)+ clearMaoHao(nowData[i][j].id))
				 .transition()
				  .duration(drawTime)
				  .attr("stroke","white")
				  .remove()
			}
			/*if(nowData[i][j].rightChild!=beforeData[i][j].rightChild){
				d3.select("#path"+clearMaoHao(beforeData[i][j].id)+ clearMaoHao(nowData[i][j].rightChild))
				 .transition()
				  .duration(drawTime)
				  .attr("stroke","white")
				  .remove()
			}
			if(nowData[i][j].letfChild!=beforeData[i][j].letfChild){
				d3.select("#path"+clearMaoHao(beforeData[i][j].id)+ clearMaoHao(nowData[i][j].letfChild))
				 .transition()
				  .duration(drawTime)
				  .attr("stroke","white")
				  .remove()
			}*/
			
		}
	}
}
/**
 * 此类用于letfSubtreeChange
 * 
 * @author "我就是我 是不一样的烟花"
 *
 */
//根据数组和清除冒号的changeId 进行merge
var direct=0;				//看leftSubTreeChange
function moveTreeLeftRect(data,id){
	var aimNode=node(data,id);  
	var newAddNode=node(data,clearMaoHao(aimNode.letfChild));
	d3.select("#rect"+ clearMaoHao(aimNode.letfChild))
	   .transition().duration(drawTime)
	   .attr("x", function(){
		      return Number(document.getElementById("rect"+clearMaoHao(aimNode.letfChild)).getAttribute("x"))+Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("x"))+direct;
     })
		.attr("y", function(){
     	return (aimNode.depth-(-1))*listPadding;
     })
		.delay(drawTime)
	d3.select("#rectR"+ clearMaoHao(aimNode.letfChild))
	   .transition().duration(drawTime)
	    .attr("x", function(){
	    	return Number(document.getElementById("rect"+clearMaoHao(aimNode.letfChild)).getAttribute("x"))+Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("x"))+direct -nextWidth;
     })
		.attr("y", function(){
     	return (aimNode.depth-(-1))*listPadding;
     })
		.delay(drawTime)
	d3.select("#rectL"+ clearMaoHao(aimNode.letfChild))
	   .transition().duration(drawTime)
	   .attr("x", function(){
		   return Number(document.getElementById("rect"+clearMaoHao(aimNode.letfChild)).getAttribute("x"))+Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("x"))+direct+rectWidth;
     })
		.attr("y", function(){
     	return (aimNode.depth-(-1))*listPadding;
     })
		.delay(drawTime)
	d3.select("#text"+ clearMaoHao(aimNode.letfChild))
		   .transition().duration(drawTime)
		   .attr("x", function(){
			   return  Number(document.getElementById("rect"+clearMaoHao(aimNode.letfChild)).getAttribute("x"))+Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("x"))+direct+10;
	        })
			.attr("y", function(){
	        	return (aimNode.depth-(-1))*listPadding+30;
	        })
			.delay(drawTime)
	if(newAddNode.letfChild!="") {
		startX= Number(document.getElementById("rect"+clearMaoHao(aimNode.letfChild)).getAttribute("x"))+Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("x"))+direct-nextWidth/2;
	    startY= newAddNode.depth*listPadding+rectHeight/2;
		endX  = Number(document.getElementById("rect"+clearMaoHao(newAddNode.letfChild)).getAttribute("x"))+Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("x"))+direct;
	    endY=(newAddNode.depth-(-1))*listPadding;
        var path_end="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;
		 
		d3.select("#path"+ clearMaoHao(newAddNode.letfChild))
		  .transition()
		  .duration(drawTime)
		  .delay(drawTime)
		  .attr("d",path_end);
		
		moveTreeLeftRect(nowData,clearMaoHao(newAddNode.id));
	}
	if(newAddNode.rightChild!="") {
		startX=Number(document.getElementById("rect"+clearMaoHao(aimNode.letfChild)).getAttribute("x"))+Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("x"))+direct+rectWidth+nextWidth/2;
	    startY= newAddNode.depth*listPadding+rectHeight/2;
		endX=Number(document.getElementById("rect"+clearMaoHao(newAddNode.rightChild)).getAttribute("x"))+Number(document.getElementById("rect"+clearMaoHao(action.changeId)).getAttribute("x"))+direct;
	    endY=(newAddNode.depth-(-1))*listPadding;
        var path_end="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;
		 
		d3.select("#path"+ clearMaoHao(newAddNode.rightChild))
		  .transition()
		  .duration(drawTime)
		  .delay(drawTime)
		  .attr("d",path_end);
		
		moveTreeRightRect(nowData,clearMaoHao(newAddNode.id));
	}
}



function leftSubtreeChange(nowData,beforeData,action){
	//看下letfSubtreeMerge
	if(action.action=="leftSubtreeMerge"&&nowData[firstPlace(clearMaoHao(action.changeId))][0].id==node(nowData,clearMaoHao(action.changeId)).letfChild){
		
	    leftExceptionLine(clearMaoHao(action.changeId),clearMaoHao(nowData[firstPlace(clearMaoHao(action.changeId))][0].id))
	
	}else{
	
		//direct是新增节点的原来x值
		if(node(nowData,clearMaoHao(action.changeId)).letfChild!=""){
			direct=-Number(document.getElementById("rect"+clearMaoHao(node(nowData,clearMaoHao(action.changeId)).letfChild)).getAttribute("x"))-padding;
		}
		for(var i=0;i<nowData.length;i++){
			for(var j=0;j<nowData[i].length;j++){
				if(nowData[i][j].id==action.changeId){
					//删除changeId的原下一个节点并判断其中是否有根，有根有节点及其子节点保留。
					//移动changeId的新下一个节点并判断其是否有子节点有则移动这个子节点，递归。
					if(nowData[i][j].id==action.changeId){
						 //减一或者加一减一
						if(nowData[i][j].letfChild==""||(nowData[i][j].letfChild!=""&&beforeData[i][j].letfChild!=""&&nowData[i][j].letfChild!=beforeData[i][j].letfChild)){
							//如果减一的节点已经不在了就擦掉这个节点并判断它的子节点是否存在  若存在则其也做减一递归。
							if(!isHaveNode(nowData,clearMaoHao(beforeData[i][j].letfChild))){
								delectTreeNode(beforeData[i][j].letfChild);
							}
							//如果减一的指向处节点还在
							if(isHaveNode(nowData,clearMaoHao(beforeData[i][j].letfChild))){
								//修复链表一分为二时找不到beforeData的bug
								if(node(beforeData,clearMaoHao(beforeData[i][j].letfChild)).point!=""){
									delectExceptionLine(beforeData[i][j].id,beforeData[i][j].letfChild);
								}else{
									if(isExceptionLine(clearMaoHao(beforeData[i][j].id),clearMaoHao(beforeData[i][j].letfChild))){
										delectExceptionLine(beforeData[i][j].id,beforeData[i][j].letfChild);
										//修复了异常线没有变成正常线的bug
										var nowbaba=node(nowData,clearMaoHao(beforeData[i][j].letfChild)).parent;
										changeExceptionLine(nowbaba,beforeData[i][j].letfChild);
										
									}else{
										delectExceptionLine(beforeData[i][j].id,beforeData[i][j].letfChild);//删除正常线
										var nowbaba=node(nowData,clearMaoHao(beforeData[i][j].letfChild)).parent;
										changeExceptionLine(nowbaba,beforeData[i][j].letfChild);
									}
								}
						    }
					    	
						}
						//加一或者加一减一
						if(beforeData[i][j].letfChild==""||(nowData[i][j].letfChild!=""&&beforeData[i][j].letfChild!=""&&nowData[i][j].letfChild!=beforeData[i][j].letfChild)){
//加一减一					if(node(nowData,clearMaoHao(beforeData[i][j].letfChild)).parent!=node(beforeData,clearMaoHao(beforeData[i][j].letfChild)).parent)	{
//加一异常时传输数据有问题							
								startX=Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].id)).getAttribute("x")-nextWidth/2);
								startY= Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].id)).getAttribute("y"))+rectHeight/2;
								middleX=Number(document.getElementById("rect"+clearMaoHao(node(nowData,clearMaoHao(action.changeId)).letfChild)).getAttribute("x")-(-rectWidth/2));
								middleY=Number(document.getElementById("rect"+clearMaoHao(node(nowData,clearMaoHao(action.changeId)).letfChild)).getAttribute("y"));
								endX=Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].id)).getAttribute("x"))-padding+rectWidth/2;
						        endY=(nowData[i][j].depth)*listPadding;
								
								  var path_start="M"+startX+","+startY+"C"+startX+","+startY+" "+startX+","+startY+" "+startX+","+startY;
								  var path_middle="M"+startX+","+startY+"C"+(startX+middleX)/2+","+(startY+middleY)/2+" "+(startX+middleX)/2+","+(startY+middleY)/2+" "+middleX+","+middleY;
								  var path_end="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;
								 
								  var line=svg.append("path")
									 .attr("d",path_start)
									 .attr("fill","none")
									 .attr("stroke-width","1.5")
									 .attr("stroke","black")
									 .attr("marker-end","url(#arrow)")
									 .attr("id","path"+clearMaoHao(nowData[i][j].id)+clearMaoHao(nowData[i][j].letfChild));
									  
									 line.transition()
									 .duration(drawTime)
									 .attr("d",path_middle)
									 .transition()
									 .duration(drawTime)
									 .attr("d",path_end)
									 
								
								
									 moveTreeLeftRect(nowData,clearMaoHao(nowData[i][j].id));
//							}else{
//								
//								leftExceptionLine(clearMaoHao(nowData[i][j].id),clearMaoHao(nowData[i][j].letfChild)))
//							}
						}
				    }
				}
			}
		}
		//delectLine();
	}
}
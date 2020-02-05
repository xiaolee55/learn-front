/**
 * 我真的不会写代码
 */
var leakNode=new Array();	//存放泄露结点
var k=0;

//找出已经泄露的结点
function searchLeakNode(){
	for(var i=0;i<beforeData.length;i++)	
		for(var j=0;j<beforeData[i].length;j++){
			if(!haveThisNode(clearMaoHao(beforeData[i][j].id)))
				leakNode[k++]=clearMaoHao(beforeData[i][j].id);
		}
}
function haveThisNode(id){
	for(var i=0;i<nowData.length;i++)	
		for(var j=0;j<nowData[i].length;j++){
			if(id==clearMaoHao(nowData[i][j].id))
				return true;
	if(i==nowData.length)
		return false;
		}
}
function delNode(){			//删除泄露结点
	for(var i=0;i<leakNode.length;i++){
		var id=leakNode[i];
		d3.select("#rect"+id)
		  .transition()
		  .duration(drawTime)		  
		  .attr("fill", "white")
		  .attr("stroke","white")
		  .remove()
	  d3.select("#rectR"+id)
	   .transition()
		  .duration(drawTime)		  
		  .attr("fill", "white")
		  .attr("stroke","white")
		  .remove()
	  d3.select("#rectL"+id)
	   .transition()
		  .duration(drawTime)	  
		  .attr("fill", "white")
		  .attr("stroke","white")
		  .remove()
	  d3.select("#text"+id)
	   .transition()
		  .duration(drawTime)		  
		  .attr("stroke","white")
		  .remove()	  
	}
}
function JudgeDelLine(){			//删除指向泄露结点的指针
	for(var i=0;i<beforeData.length;i++)	
		for(var j=0;j<beforeData[i].length;j++){
			var letfChild=clearMaoHao(beforeData[i][j].letfChild);
			var rightChild=clearMaoHao(beforeData[i][j].rightChild);
			for(var k=0;k<leakNode.length;k++)
				if(letfChild==leakNode[k])
					delLine(clearMaoHao(beforeData[i][j].id),leakNode[k]);
		}
	for(var i=0;i<leakNode.length;i++){
		var letfChild=clearMaoHao(beforeData[firstPlace_before(leakNode[i])][sceondPlace_before(leakNode[i])].letfChild);
		var rightChild=clearMaoHao(beforeData[firstPlace_before(leakNode[i])][sceondPlace_before(leakNode[i])].rightChild);		
		if(beforeData[firstPlace_before(leakNode[i])][sceondPlace_before(leakNode[i])].letfChild!="")
			delLine(leakNode[i],letfChild);
		if(beforeData[firstPlace_before(leakNode[i])][sceondPlace_before(leakNode[i])].rightChild!="")
			delLine(leakNode[i],rightChild);
	}
}
function delLine(parentId,childId){
	svg.selectAll("#path"+parentId+childId)
	.transition()
	.duration(drawTime)
	.attr("stroke","white")
	.attr("marker-end","none")
	.remove();
}
function delPoint(pId){		//删除外部指针
	svg.select("#point_"+pId)
	.transition()
	.duration(drawTime)
	.attr("stroke","white")
	.remove();
	svg.select("#pointText"+pId)	
  .transition()
	.duration(drawTime)
  .attr("fill", "white")
  .remove();  
}
function pointCut(cId,pId){
	searchLeakNode();
	delPoint(pId);
	delNode();
	JudgeDelLine();
	leakNode=[];
	k=0;
	test3.innerHTML="泄露的元素为"+leakNode+"--"+leakNode.length;
}
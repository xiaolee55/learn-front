/**
 * Lee
 */

/*给树的每个节点从上到下，从左到右赋一个序号，若该结点
 为空则其序号为0，并将序号存入一维数组*/
function NodeNumber(temp_id,secondIndex,firstIndex){
	nodeOrder[firstIndex][secondIndex]=temp_id;			//直接赋与与其下标对应的值
		//左孩子的处理
		if(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].letfChild!=""){
			if(isMyParent(clearMaoHao(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].letfChild),temp_id)==true)		//验证是否为错误线
				NodeNumber(clearMaoHao(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].letfChild),secondIndex*2,firstIndex)				//传入左孩子的id和父亲下标的两倍，递归
			else
				nodeOrder[firstIndex][secondIndex*2]="";
		}
		else{
			if(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].depth!=maxDepth)
				nodeOrder[firstIndex][secondIndex*2]="";						//无左孩子则其左孩子对应值为""
			}
		//右孩子的处理
		if(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].rightChild!=""){
			if(isMyParent(clearMaoHao(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].rightChild),temp_id)==true)	//验证是否为错误线
				NodeNumber(clearMaoHao(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].rightChild),secondIndex*2+1,firstIndex)			//传入右孩子的id和父亲下标的两倍加1，递归
			else
				nodeOrder[firstIndex][secondIndex*2+1]="";
		}
		else{
			if(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].depth!=maxDepth)
				nodeOrder[firstIndex][secondIndex*2+1]="";						//无右孩子则其左孩子对应值为""
			}

}	
	
/*按照规律给树的每个节点固定一个最终位置，并将每个节点的位置
 按照从上到下，从左到右的顺序存入数组，若该结点不存在则其对应的值为0*/
function NodeLocation(firstIndex){
	for(var i=2;i<=nodeOrder[firstIndex].length;i++)
		{
		if(Math.log(i)/Math.log(2)%1==0)			//如果该下标刚好是每层树的第一个节点对应的序号，则获取该层的层数
			pile=Math.log(i)/Math.log(2)+1;
		if(i%2==0)									//若是序号为偶数的节点，则其坐标为父节点减去一个数
		 nodePlace[firstIndex][i]=nodePlace[firstIndex][i/2]-Math.pow(2,(maxDepth-pile))*(treeRectWidth+25)/2;
		else									     //若是序号为偶数的节点，则其坐标为父节点加一个数
		 nodePlace[firstIndex][i]=nodePlace[firstIndex][i/2-0.5]+Math.pow(2,(maxDepth-pile))*(treeRectWidth+25)/2;
		}	
	}

/*改变树节点的位置*/
function sizeChange(){
	var mm=0;
	for(var i=0;i<nowData.length;i++)		//对线条颜色进行调整
		for(var j=0;j<nowData[i].length;j++){
			var letf;
			var right;
			var parentId;
			if(nowData[i][j].letfChild!=""){
				 letf=clearMaoHao(nowData[i][j].letfChild);
				 parentId=clearMaoHao(nowData[firstPlace(letf)][sceondPlace(letf)].parent);
				 if(parentId==clearMaoHao(nowData[i][j].id))
					 svg.selectAll("#path"+parentId+letf)
					 .attr("stroke","black")
			}
			if(nowData[i][j].rightChild!=""){
				 right=clearMaoHao(nowData[i][j].rightChild);
				 parentId=clearMaoHao(nowData[firstPlace(right)][sceondPlace(right)].parent);
				 if(parentId==clearMaoHao(nowData[i][j].id))
					 svg.selectAll("#path"+parentId+right)
					 .attr("stroke","black")				 	 
			}	
		}
	for(var i=1;i<nodeOrder.length;i++){
		for(var j=1;j<nodeOrder[i].length;j++){
				if(nodeOrder[i][j]!="")
						{
						var nowObj=nowData[firstPlace(nodeOrder[i][j])][sceondPlace(nodeOrder[i][j])];
						svg.selectAll("#rectL"+nodeOrder[i][j])
						.transition()
						.duration(drawTime)
						.attr("x",nodePlace[i][j])
						.attr("y", function(){
			        	return nowObj.depth*listPadding;
			        });
				
					svg.selectAll("#rect"+nodeOrder[i][j])
						.transition()
						.duration(drawTime)
						.attr("x",nodePlace[i][j]+treeRectWidth/4)
						.attr("y", function(){
			        	return nowObj.depth*listPadding;
			        });
					svg.selectAll("#rectR"+nodeOrder[i][j])
						.transition()
						.duration(drawTime)
						.attr("x",nodePlace[i][j]+3*treeRectWidth/4)
						.attr("y", function(){
			        	return nowObj.depth*listPadding;
			        });
					svg.selectAll("#text"+nodeOrder[i][j])
						.transition()
						.duration(drawTime)
						.attr("x",nodePlace[i][j]+5*treeRectWidth/12-5)
					    .attr("y", function(){
			        	return nowObj.depth*listPadding+ rectHeight/2;
			        });
						if(maxDepth>1&&(nowObj.lchild!=""||nowObj.rchild!="")){
								/*线段的起始结点和终止结点id*/
							var	parentNode=nodeOrder[i][j];
							var	letfChildNode=clearMaoHao(nowObj.letfChild);
							var	rightChildNode=clearMaoHao(nowObj.rightChild);
							var letfChildYPlace;
							var rightChildYPlace;
							/*线段的起始高度和终止高度*/
							var	parentYPlace=nowObj.depth*listPadding;
							if(nowObj.letfChild!="")
									letfChildYPlace=nowData[firstPlace(letfChildNode)][sceondPlace(letfChildNode)].depth*listPadding;
							if(nowObj.rightChild!="")
								 rightChildYPlace=nowData[firstPlace(rightChildNode)][sceondPlace(rightChildNode)].depth*listPadding;
							
							
							/*线段的起始横坐标和终止横坐标*/
							var	parentXPlace=nodePlace[i][j];
							var	letfChildXPlace=findChildPlace(letfChildNode);
							var	rightChildXPlace=findChildPlace(rightChildNode);
						
							linePainting("left",parentXPlace,letfChildXPlace,parentYPlace,letfChildYPlace,parentNode,letfChildNode);
							linePainting("right",parentXPlace,rightChildXPlace,parentYPlace,rightChildYPlace,parentNode,rightChildNode);
					}
						for(var k=0;k<nowObj.point.length;k++){			//移动外部指针
							var pointS_X=nodePlace[i][j]+80/(nowObj.point.length+1)*(k+1);
							var pointS_Y=nowObj.depth*listPadding-25;
							var pointM_X=nodePlace[i][j]+80/(nowObj.point.length+1)*(k+1);
							var pointM_Y=nowObj.depth*listPadding-7;
							var pointE_X=nodePlace[i][j]+80/(nowObj.point.length+1)*(k+1);
							var pointE_Y=nowObj.depth*listPadding-5;
							var path="M"+pointS_X+","+pointS_Y+"C"+pointM_X+","+pointM_Y+" "+pointM_X+","+pointM_Y+" "+pointE_X+","+pointE_Y;
							svg.selectAll("#point_"+nowObj.point[k])
							.transition()
							 .duration(drawTime)
							 .attr("d",path);
							svg.selectAll("#pointText"+nowObj.point[k])
							 .transition()
							 .duration(drawTime)
							 .attr("x",pointE_X)
							 .attr("y",pointS_Y);
						}
							
			}		 
		
	}
  }
	
	/*位置调整函数执行完之后，数组清空*/
	for(var i=1;i<nodeOrder.length;i++)
		nodeOrder[i]=[];
	for(var i=1;i<nodePlace.length;i++)
		nodePlace[i]=[];
}

/*传入父亲节点的id和子节点的id让线段发生变化*/
function linePainting(sign,startXPlace,endXPlace,startYPlace,endYPlace,startNode,endNode){
			if(sign=="left")
				startX=startXPlace+treeRectWidth/8;
			else
				startX=startXPlace+7*treeRectWidth/8;
			startY= startYPlace+rectHeight/2;
			middleX=left+rectWidth;
			middleY=(drawHeight + 1) * listPadding+rectHeight/2;
			endX=endXPlace+treeRectWidth/2;
			endY=endYPlace;
		
		
			  var path_start="M"+startX+","+startY+"C"+(startX+startX)/2+","+(startY+startY)/2+" "+(startX+startX)/2+","+(startY+startY)/2+" "+startX+","+startY;
			  var path_middle="M"+startX+","+startY+"C"+(startX+middleX)/2+","+(startY+middleY)/2+" "+(startX+middleX)/2+","+(startY+middleY)/2+" "+middleX+","+middleY;
			  var path_end="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;
				  svg.selectAll("#path"+startNode+endNode)
				 .transition()
				 .duration(drawTime)
				 .attr("d",path_end)	 	  
}

/*根据结点ID寻找其在nodeOrder中的序号*/
function findChildPlace(id){
	for(var i=1;i<nodeOrder.length;i++)
		for(var j=1;j<nodeOrder[i].length;j++)
				if(nodeOrder[i][j]==id)
					return nodePlace[i][j];
}
function childDepth(sign,parentId){
	if(sign=="letf")
		if(nowData[firstPlace(parentId)][sceondPlace(parentId)].letfChild!="")
		   return nowData[clearMaoHao(nowData[firstPlace(parentId)][sceondPlace(parentId)].letfChild)][clearMaoHao(nowData[firstPlace(parentId)][sceondPlace(parentId)].letfChild)].depth;
	if(sign=="right")
		if(nowData[firstPlace(parentId)][sceondPlace(parentId)].letfChild!="")
			return nowData[clearMaoHao(nowData[firstPlace(parentId)][sceondPlace(parentId)].letfChild)][clearMaoHao(nowData[firstPlace(parentId)][sceondPlace(parentId)].letfChild)].depth;
}
/**
 * 
 * 指向其他链表的首元结点  
 */


function otherFirst(nowData,beforeData,action){
	var d;//线的路径
	var d2;//目标线过渡时的路径
	
	var count=0;
	//所有矩形的处理
	for(var i=0;i<beforeData.length;i++){		
		
		for(var j=0;j<beforeData[i].length;j++){
			
			if(!isHaveNode(nowData,clearMaoHao(beforeData[i][j].id) ) ){
				//1 泄漏数组增加结点
				//2 移动泄漏数据图形
				
			
				var blank=0;
				if( leakArray[leakArray.length-1].length==0 ){
					blank=1;
				}
				var row = leakArray.length;
				leakArray[row-blank] = new Array();
				leakArray[row-blank][count]=beforeData[i][j];
				
				svg.select("#rect"+clearMaoHao(beforeData[i][j].id))
				    .transition()
				    .duration(drawTime)
					.attr("fill","LightPink")
					.attr("stroke","LightPink")
					.attr("x",position_x(7))
					.attr("y",position_y(row-blank))
					
					
				svg.select("#rectNext"+clearMaoHao(beforeData[i][j].id))
				    .transition()
				    .duration(drawTime)
					.attr("fill","black")
					.attr("stroke","LightPink")
					.attr("x",position_x(7)+rectWidth)
					.attr("y",position_y(row-blank))
					
				svg.select("#text"+clearMaoHao(beforeData[i][j].id))
				    .transition()
				    .duration(drawTime)
					.attr("x",position_x(7)+rectWidth/3)
					.attr("y",position_y(row-blank)+rectHeight/2)	
					
				svg.select("#path"+clearMaoHao(beforeData[i][j].id))
					.remove()
				
				count++;
				
			}
			if(isHaveNode(nowData,clearMaoHao(beforeData[i][j].id))){
				//3 现有数据的矩形和线的移动
				var y=search_node(nowData,clearMaoHao(beforeData[i][j].id)).y;
				var x=search_node(nowData,clearMaoHao(beforeData[i][j].id)).x;
				rect_move(clearMaoHao(beforeData[i][j].id),x,y,drawTime);
				
			}
		}
	}
	//线的移动
	for(var i = 0; i < nowData.length; i++){
		
	    for(var j = 0; j < nowData[i].length; j++){
		 
		   if(nowData[i][j].nextId!=""){
			  
				 var endY = search_node(nowData,clearMaoHao(nowData[i][j].nextId)).y;
				 var endX = search_node(nowData,clearMaoHao(nowData[i][j].nextId)).x;
				 
				 if(j == nowData[i].length-1&&endY==i){
					 d = transform(i,j,endY,endX,"curve");
				 }
				
				 else{
					 d = transform(i,j,endY,endX,"line");
				 }
				 
				 
				if(clearMaoHao(nowData[i][j].id)==action.changeId)  {

						//目标线的过渡
						var endY1 = search_node(beforeData,action.changeId).y;
						var endX1 = search_node(beforeData,action.changeId).x;
						var endY2 = search_node(beforeData,clearMaoHao(nowData[i][j].nextId)).y;
						var endX2 = search_node(beforeData,clearMaoHao(nowData[i][j].nextId)).x;
						  
						d2 = transform(endY1,endX1,endY2,endX2,"line");	
						svg.select("#path"+clearMaoHao(nowData[i][j].id))
							 .transition()
							 .duration(drawTime)
							 .attr("fill","none")
							 .attr("stroke-width","1.5")
							 .attr("stroke","black")
							 .attr("d",d2)
							 .transition()
							 .duration(drawTime)
							 .attr("d",d)
							 .delay(drawTime)
				}
				else {
					move_line(clearMaoHao(nowData[i][j].id),d,drawTime);
				}
				
		   }
		   
		}
		  
	}
	
}
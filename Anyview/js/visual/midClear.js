/**
 * Lee
 */
	// var actionSet = document.getElementById("actionSet").innerHTML;		//取得操作区内容
	// var action = JSON.parse(actionSet);		//转化为json对象
	// var firstLeakNodeRow;					//第一个泄露节点的行数
	// var firstLeakNodeLine;					//第一个泄露节点的列数

	//判断节点是否泄露
function midClear(nowData,beforeData){
		 //对应指针消失
	    svg.select("#path"+action.changeId)
	    .remove();
	    
		for(var i=0;i<beforeData.length;i++)		//获取第一个泄露节点的位置
			for(var j=0;j<beforeData[i].length;j++)
				{
				if(clearMaoHao(beforeData[i][j].id)==action.changeId)
					{
						firstLeakNodeRow=i;
						firstLeakNodeLine=j+1;
					}			
				}

		/*如果上一行泄露链表不为空，则行数自增1*/
	    	if(leakArray[leakArray_row].length!=0)		
	    		{
	    			leakArray_row++;
	    			leakArray[leakArray_row]=new Array();
	    		}
	  /*遍历消失指针所指向的节点*/
	    for(var j=firstLeakNodeLine;j<beforeData[firstLeakNodeRow].length;j++)
				{
	    	/*遍历最新的数据查找该节点是否存在，若不存在则发生泄漏*/
	    	
	    	for(var i=0;i<nowData.length;i++)		
	    		for(var k=0;k<nowData[i].length;k++)
	    			if(nowData[i][k].id==beforeData[firstLeakNodeRow][j].id)
	    			{
	    				var firstNotLeakNodeLine=j;
						not_leak_node(firstLeakNodeRow,firstNotLeakNodeLine);	//调用非泄露节点函数
						return;
	    				
	    			}							//调用节点泄露函数
				if(i==nowData.length){
					leakArray_line++;
    				leakArray[leakArray_row][leakArray_line]=beforeData[firstLeakNodeRow][j];		//给泄露数组存放数据
    				leak_node(leakArray_row,j);
					} 
				}	
	   }
	
	/*泄露节点的函数*/	
function leak_node(row,line){ 		
		var leakId=clearMaoHao(beforeData[firstLeakNodeRow][line].id);
		svg.select("#rect"+leakId)
		.transition()
		.duration(drawTime)
		.delay(drawTime)
		.attr("fill","LightPink")
		.attr("stroke","LightPink")
		 .attr("x" , function() {
        return left+(7+line-firstLeakNodeLine)*padding;
		 })
		.attr("y", function(){
        return row * listPadding+150;
		})

	
		svg.select("#rectNext"+leakId)
		.transition()
		.duration(drawTime)
		.delay(drawTime)
		.attr("fill","black")
		.attr("stroke","black")
		.attr("x" , function() {
        return left+(7+line-firstLeakNodeLine)*padding + rectWidth;
		})
    	.attr("y", function(){
    	return row * listPadding+150;
    	})
    
		svg.select("#text"+leakId)
		.transition()
		.duration(drawTime)
		.delay(drawTime)
		.attr("x",function(){
        return left+(7+line-firstLeakNodeLine)*padding + rectWidth/3;
		})
		.attr("y", row * listPadding+ rectHeight/2+150)
	
	startX=left+(7+line-firstLeakNodeLine)*padding+rectWidth + nextWidth;
	startY=row * listPadding+rectHeight/2+150;
	endX=left+(7+line-firstLeakNodeLine)*padding+rectWidth + nextWidth+arrowPadding;
	endY=row * listPadding+rectHeight/2+150;
	var path="M"+startX+","+startY+"C"+(startX+endX)/2+","+startY+" "+(startX+endX)/2+","+startY+" "+endX+","+startY;			                	
		svg.select("#path"+leakId)
		.transition()
		.duration(drawTime)
		.delay(drawTime)
		.attr("d",path)
	
	}  	
				

	/*未泄露节点的函数*/	
function not_leak_node(row,line){  
	
	for(var k=0;k<nowData.length;k++){
		 for(var i = 0; i < nowData[k].length; i++){

				        var short_id = clearMaoHao(nowData[k][i].id);			
				                	
				                //移动数据域矩形
				                svg.select("#rect" + short_id )
				                    .transition()
				                    .delay(drawTime)
				                    .duration(drawTime)
				                    .attr("x",getXLocat(short_id,nowData))
				                    .attr("y",function(){
				                        return getYLocat(short_id,nowData);
				                    });

				                //移动next域矩形
				                svg.select("#rectNext" + short_id )
				                    .transition()
				                    .delay(drawTime)
				                    .duration(drawTime)
									.attr("x",getXLocat(short_id,nowData)+ rectWidth)
				                    .attr("y",function(){
				                        return getYLocat(short_id,nowData);
				                    });

				                //移动数据域内容
				                svg.select("#text" +short_id )
				                    .transition()
				                    .delay(drawTime)
				                    .duration(drawTime)
									.attr("x",getXLocat(short_id,nowData)+rectWidth/3)
				                    .attr("y",function(){
				                        return getYLocat(short_id,nowData) - (- rectHeight/2);
				                    });
				                
				                	var startX=getXLocat(short_id,nowData)+rectWidth+nextWidth;
				                	var endX=startX+arrowPadding;
				                	var startY=getYLocat(short_id,nowData)+rectHeight/2;
				                	
				                	
				                //移动本链表发出的箭头	
				                if(i !=nowData[k].length-1){
				                  var path="M"+startX+","+startY+"C"+(startX+endX)/2+","+startY+" "+(startX+endX)/2+","+startY+" "+endX+","+startY;			                	
				                  svg.select("#path"+short_id)
				                	.transition()
				                    .delay(drawTime)
				                    .duration(drawTime)
				                	.attr("d",path)
				                 }
				                else{				//处理最后一条线
				                	var lastId=clearMaoHao(nowData[k][i].nextId);
				                	for(var m=0;m<i;m++){
				                		if(clearMaoHao(nowData[k][m].id)==lastId){
				                			var path="M"+startX+","+(getYLocat(short_id,nowData)+rectHeight/2)+"C"+(startX-20)+","+(getYLocat(short_id,nowData)+rectHeight/2-80)
						                	+" "+(getXLocat(lastId,nowData)+20)+","+(getYLocat(short_id,nowData)+rectHeight/2-80)+" "+getXLocat(lastId,nowData)
						                	+","+(getYLocat(short_id,nowData)+rectHeight/2);

						                  svg.select("#path"+short_id)
						                	.transition()
						                    .delay(drawTime)
						                    .duration(drawTime)
						                	.attr("d",path)
						                	break;
				                			}
				                	}
				               if(m==i)
				            	   {
				            	 //斜线的终点坐标
				            	   var endX=getXLocat(lastId,nowData);
				            	   var endY=getYLocat(lastId,nowData)+rectHeight/2;



				            	   var path="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;
					                  svg.select("#path"+short_id)
					                	.transition()
					                    .delay(drawTime)
					                    .duration(drawTime)
					                	.attr("d",path)
				            	   }

				                }
				}

		}
	
	
		//获取重新布局之后的行数
		/*if(line!=beforeData[row].length-1)
			newRow=getYRow(clearMaoHao(beforeData[row][line+1].id),nowData);
		else
			newRow=getYRow(clearMaoHao(beforeData[row][line].id),nowData);

				for(var k=0;k<nowData[newRow].length;k++)				//按照链表的最新位置排列
				{
					var not_leakId=clearMaoHao(nowData[newRow][k].id);
					svg.select("#rect"+not_leakId)
					.transition()
					.duration(drawTime*2)
					.delay(drawTime)
					.attr("x",getXLocat(not_leakId,nowData))
					.attr("y",getYLocat(not_leakId,nowData))	
					
					svg.select("#rectNext"+not_leakId)
					.transition()
					.duration(drawTime*2)
					.delay(drawTime)
					.attr("x",getXLocat(not_leakId,nowData)+ rectWidth)
					.attr("y",getYLocat(not_leakId,nowData))	
					
					svg.select("#text"+not_leakId)
					.transition()
					.duration(drawTime*2)
					.delay(drawTime)
					.attr("x",getXLocat(not_leakId,nowData)+rectWidth/3)
					.attr("y",getYLocat(not_leakId,nowData)+ rectHeight/2)	
				
					if(k<nowData[newRow].length-1){						//除最后一条线外的其他线
						 var startX=getXLocat(not_leakId,nowData)+rectWidth+nextWidth;
	  			         var startY=getYLocat(not_leakId,nowData)+rectHeight/2;						
						 var endX=getXLocat(not_leakId,nowData)+rectWidth+nextWidth+arrowPadding;
	  			         var endY=getYLocat(not_leakId,nowData)+rectHeight/2;
	  			        
					  var path="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;		  				                						  
					  lineMove(not_leakId,path);
					}
			
					else{		//最后一条线
						var lastId=clearMaoHao(nowData[newRow][k].nextId);
						var startX=getXLocat(not_leakId,nowData)+rectWidth+nextWidth;
	  			        var startY=getYLocat(not_leakId,nowData)+rectHeight/2;
	  			        var endX=getXLocat(lastId,nowData);
	  			        var endY=getYLocat(lastId,nowData)+rectHeight/2;
						if(getYRow(not_leakId,nowData)==getYRow(lastId,nowData)){
							var path_1="M"+startX+","+startY+"C"+(startX-20)+","+(startY-80)
		                	+" "+(getXLocat(lastId,nowData)+20)+","+(endY-80)+" "+endX
		                	+","+endY;
						}
						else{
							var path_1="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2
		                	+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX
		                	+","+endY;
						}
						
						lineMove(not_leakId,path_1);
						break;
					}						
					  
				}*/
				
			}
		
//处理线段移动函数
function lineMove(id,path){											
	
	svg.select("#path"+id)
	.transition()
    .delay(drawTime)
    .duration(drawTime*2)
	.attr("d",path)
}	
	
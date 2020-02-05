/**
 * 我真的不会写代码
 */
function treeAddOne(nowData,beforeData,action){
	svg=d3.select("svg");
	maxDepth=0;
	  var child;					//存放新增节点的位置信息（左或者右）
	  var changeLocation_a;			//存放新增节点的数组位置
	  var changeLocation_b;			//存放新增节点的数组位置
	/*得到新增节点在数组中的位置*/
	      changeLocation_a=firstPlace(clearMaoHao(action.changeId));
		  changeLocation_b=sceondPlace(clearMaoHao(action.changeId));
		 
		  
	  if(beforeData!=null&&isHaveNode(beforeData,clearMaoHao(action.changeId))){
			var nowbaba=node(nowData,clearMaoHao(action.changeId)).parent;
			if(node(nowData,clearMaoHao(nowbaba)).letfChild==action.changeId) leftExceptionLine(clearMaoHao(nowbaba),clearMaoHao(action.changeId));
			if(node(nowData,clearMaoHao(nowbaba)).rightChild==action.changeId) rightExceptionLine(clearMaoHao(nowbaba),clearMaoHao(action.changeId));
	 }else{
			
	 
	  if(nowData[changeLocation_a][changeLocation_b].parent!="")	
		  for(var i=0;i<nowData.length;i++){				//判断新增节点是左孩子还是右孩子
			  for(var j=0;j<nowData[i].length;j++)	
			  if(clearMaoHao(nowData[i][j].id)==clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent))
			  { 
				  if(clearMaoHao(nowData[i][j].letfChild)==clearMaoHao(action.changeId)){
					  child="left";
					  break;
					  }
				  else{
					  child="right";
					  break;
				  }
			  }
		  }
	
    if(nowData[changeLocation_a][changeLocation_b].parent==""){
     var pointId=nowData[changeLocation_a][changeLocation_b].point[0];
   	 var point_path="M"+20+","+10+"C"+20+","+10+" "+20+","+10+" "+20+","+30;
	 var point=svg.append("path")
		 .attr("fill","none")
		 .attr("stroke-width","1.5")
		 .attr("stroke","blue")
		 .attr("marker-end","url(#arrow)")
		 .attr("d",point_path)
		 .attr("id","point_"+pointId);
     var textP = svg.append("text")															
	      .attr("fill", "white")
	      .attr("id", "pointText" +pointId)
	      .attr("y",12)
	      .attr("x",20)
	      .attr("fill", "black")
	      .text(pointId);
    }

	  																							//数据域矩形
    var rectD = svg.append("rect")						
        .attr("fill", "white")
         .attr("id", "rect" + clearMaoHao(action.changeId))
        .attr("y", function(){
            return (drawHeight) * listPadding;
        })
        .attr("x" , function() {
            return left+nextWidth;
        })
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("fill", color.data)
     if(nowData[changeLocation_a][changeLocation_b].parent!=""){							//数据域的动画
 	      rectD.transition()
 	        .duration(drawTime)
 	        .delay(drawTime)
 	        .attr("x",function(){
 	        	if(child=="left")
 	        	    return  Number(document.getElementById("rect"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))-padding;
 	        	else 
 	        	    return  Number(document.getElementById("rect"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))+padding;
 	        })
 	        .attr("y", function(){
 	        	return nowData[changeLocation_a][changeLocation_b].depth*listPadding;
 	        });
     }
     
    																					//左儿子域矩形
    var rectL = svg.append("rect")
        .attr("fill", "white")
        .attr("stroke", "white")
         .attr("id", "rectL" + clearMaoHao(action.changeId))
        .attr("y", function(){
        	 return (drawHeight) * listPadding;
        })
        .attr("x" , function() {
            return left;
        })
        .attr("width", nextWidth)
        .attr("height", rectHeight)
        .attr("fill", color.next)
        .attr("stroke", color.stroke)
     if(nowData[changeLocation_a][changeLocation_b].parent!=""){							//左指针域的动画
            rectL.transition()
                .duration(drawTime)
     	        .delay(drawTime)
                .attr("x",function(){
                	if(child=="left")
                     	return  Number(document.getElementById("rectL"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))-padding;
                	else 
                		return  Number(document.getElementById("rectL"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))+padding;
                })
                .attr("y", function(){
                	return nowData[changeLocation_a][changeLocation_b].depth*listPadding;
                });
            }

    																					//右儿子域矩形
    var rectR = svg.append("rect")
        .attr("fill", "white")
        .attr("stroke", "white")
        .attr("id", "rectR" + clearMaoHao(action.changeId))
        .attr("y", function(){
            return (drawHeight) * listPadding;
        })
        .attr("x" , function() {
            return left+ rectWidth+nextWidth;
        })
        .attr("width", nextWidth)
        .attr("height", rectHeight)
        .attr("fill", color.next)
        .attr("stroke", color.stroke)
    if(nowData[changeLocation_a][changeLocation_b].parent!=""){							//右指针域的动画
            rectR.transition()
                .duration(drawTime)
     	        .delay(drawTime)
                .attr("x",function(){
                	if(child=="left")
                	    return Number(document.getElementById("rectR"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))-padding;
                	else 
                		return Number(document.getElementById("rectR"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))+padding;
                })
                .attr("y", function(){
                	return nowData[changeLocation_a][changeLocation_b].depth*listPadding;
                });
            }
    																								//数据域内容
    var textD = svg.append("text")															
        .attr("fill", "white")
        .attr("id", "text" + clearMaoHao(action.changeId))
        .attr("y", (drawHeight) * listPadding + rectHeight/2)
        .attr("x",function(){
            return left + rectWidth/3+nextWidth;
        })
        .attr("fill", color.text)
        .text(action.data);
    
	 if(nowData[changeLocation_a][changeLocation_b].parent!=""){							//文本的动画
            textD.transition()
                .duration(drawTime)
     	        .delay(drawTime)
                 .attr("x",function(){
                	 if(child=="left")
                	     return Number(document.getElementById("text"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))-padding;
                	 else 
                		 return Number(document.getElementById("text"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))+padding;
                 })
                .attr("y", function(){
                	return nowData[changeLocation_a][changeLocation_b].depth*listPadding+ rectHeight/2;
                });
            }       
     //线条的处理
    
	 if(nowData[changeLocation_a][changeLocation_b].parent!="")									//处理线段
		 {
			if(child=="left"){
				startX=Number(document.getElementById("rect"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"));
				startY= Number(document.getElementById("rect"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("y"))+rectHeight/2;
				middleX=left+rectWidth;
				middleY=(drawHeight) * listPadding+rectHeight/2;
				endX=Number(document.getElementById("rect"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))-padding+rectWidth/2;
				endY=Number(document.getElementById("rect"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("y"))+listPadding-5;
				}
			 else{
					startX=Number(document.getElementById("rect"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))+rectWidth;
					startY= Number(document.getElementById("rect"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("y"))+rectHeight/2;
					middleX=left+rectWidth;
					middleY=(drawHeight) * listPadding+rectHeight/2;
					endX=Number(document.getElementById("rect"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("x"))+padding+rectWidth/2;
					endY=Number(document.getElementById("rect"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)).getAttribute("y"))+listPadding-5; 
			 }
			  var path_start="M"+startX+","+startY+"C"+(startX+startX)/2+","+(startY+startY)/2+" "+(startX+startX)/2+","+(startY+startY)/2+" "+startX+","+startY;
			  var path_middle="M"+startX+","+startY+"C"+(startX+middleX)/2+","+(startY+middleY)/2+" "+(startX+middleX)/2+","+(startY+middleY)/2+" "+middleX+","+middleY;
			  var path_end="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(startX+endX)/2+","+(startY+endY)/2+" "+endX+","+endY;
			 
			  var line=svg.append("path")
			 .attr("d",path_start)
			 .attr("fill","none")
			 .attr("stroke-width","1.5")
			 .attr("stroke","black")
			 .attr("marker-end","url(#arrow)")
			 .attr("id","path"+clearMaoHao(nowData[changeLocation_a][changeLocation_b].parent)+clearMaoHao(action.changeId));
			  
			 line.transition()
			 .duration(drawTime)
			 .attr("d",path_middle)
			 .transition()
			 .duration(drawTime)
			 .attr("d",path_end)
		 }    
	
	 }
       

}
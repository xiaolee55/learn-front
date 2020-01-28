/*
 * 重画
 * 画矩形
 * 画除最后一个节点以外的线
 * 判断最后一个节点是否有线 是直线还是曲线
 */
function repainting(nowData,beforeData){
	svg=d3.select("svg"); 
    if(beforeData!=null){
		for(var i = 0; i < beforeData.length; i++){
			
		   for(var j = 0; j < beforeData.length; j++){
		  
			  svg.select("#rect"+clearMaoHao(nowData[i][j].id))
			  	 .remove()
			   
		   }
		   
		}
    }
    
	for(var i = 0; i < nowData.length; i++){
		
 	   for(var j = 0; j < nowData[i].length; j++){
 		   
 		  quick_write_simpleRect(clearMaoHao(nowData[i][j].id),j,i,nowData[i][j].dataText);
 		  
 		  if(j<nowData[i].length-1){
 			  
 			 var d = transform(i,j,i,j+1,"line");
 			 
 			 draw_line(clearMaoHao(nowData[i][j].id),d);
 		  }
 		 
 	   }
 	} 	
	for(var i = 0; i < nowData.length; i++){
		
		 
		  var last=nowData[i].length-1
			  
		  if(nowData[i][last].nextId!=""){
			  
			 var endY = search_node(nowData,clearMaoHao(nowData[i][last].nextId)).y;
			 var endX = search_node(nowData,clearMaoHao(nowData[i][last].nextId)).x;
			 
			 if(endY==i)
				 
				{var d = transform(i,last,endY,endX,"curve");
				var test3 = document.getElementById("test3");   //取得测试区id
			    test3.innerHTML  =  "我能在里面执行hahah";
			    
				}
			 
			 else
				{var d = transform(i,last,endY,endX,"line");}
			 
			 draw_line(clearMaoHao(nowData[i][last].id),d);
		  }
		  
	}
}
function quick_write_simpleRect(id,number_x,number_y,textData){//画矩形
	var textRect = svg.append("rect").attr("id","rect"+id)
	   .attr("x",position_x(number_x)).attr("y",position_y(number_y)+listPadding)
	   .attr("width",rectWidth).attr("height",rectHeight)
	   .attr("stroke","white").attr("fill", color.data)
	   .attr("stroke","white").attr("fill", color.data)
	   .attr("x",position_x(number_x)).attr("y",position_y(number_y))
	   
	
	
	var rectNext=svg.append("rect").attr("id","rectNext"+id)
					   .attr("x",position_x(number_x)+rectWidth).attr("y",position_y(number_y)+listPadding)
					   .attr("width",nextWidth).attr("height",rectHeight)
					   .attr("fill", color.next)
				       .attr("stroke", color.stroke)                             
					   .attr("fill", color.next)
				       .attr("stroke", color.stroke)
					   .attr("x",position_x(number_x)+rectWidth).attr("y",position_y(number_y))	
					  
	
	var text =svg.append("text").attr("id","text"+id)
			   .attr("x",position_x(number_x)+rectWidth/3).attr("y",position_y(number_y)+rectHeight/2+listPadding) 
			   .text(textData)
			   .attr("x",position_x(number_x)+rectWidth/3).attr("y",position_y(number_y)+rectHeight/2)
		
}
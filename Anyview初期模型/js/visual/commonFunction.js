	//数据的总节点数
	function total(data){
		var count=0;
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[i].length;j++){
				count++;
			}
		}
		return count;
	}
	//根据id找到目标矩形x
	function getXLocat(id,data){
		var row=-1;
		var index=-1;
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[i].length;j++){
			var beId=clearMaoHao(data[i][j].id);
			if(beId==id){
				row=i;
				index=j;
				return index*padding+left;
			}
		}
	}
		
}
	//根据id找到y
	function getYLocat(id,data){
		var row=-1;
		var index=-1;
		
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[i].length;j++){
				var beId=clearMaoHao(data[i][j].id);
				if(beId==id){
					row=i;
					index=j;
					return (row+1)*listPadding;
				}
			}
		}
		
	}
	
	//获取指定id的行数
	function getYRow(id,data){
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[i].length;j++){
				if(id ==clearMaoHao(data[i][j].id)) return i;
			}
		}
	}
	
	//传data数据和已经去冒号的id，返回位置数组
	function search_node(data,id){
		 var indexX=0;
		 var indexY=0; 
		 var array={"x":"null","y":"null"};
		 for (indexX=0; indexX < data.length; indexX++) 
		 {
		   for(indexY=0;indexY<data[indexX].length;indexY++)
				if (clearMaoHao(data[indexX][indexY].id)===id) 
				{
				  array.y=indexX;
				  array.x=indexY;
				  return array;
				}
		 }
	}
	
	//传data数据和已经去冒号的id，返回整个节点
	function node(data,id){
		 var indexX=0;
		 var indexY=0; 
		 for (indexX=0; indexX < data.length; indexX++) 
		 {
		   for(indexY=0;indexY<data[indexX].length;indexY++)
				if (clearMaoHao(data[indexX][indexY].id)===id) 
				{
				  return data[indexX][indexY];
				}
		 }
	}
	
	//判断data数据中是否有该去冒号id的节点
	function isHaveNode(data,id){
		 
		 for (indexX=0; indexX < data.length; indexX++) 
		 {
		   for(indexY=0;indexY<data[indexX].length;indexY++)
			   
				if (clearMaoHao(data[indexX][indexY].id)==id) 
				{
				  return true;
				}
		 }
		 return false;
	}
	//将节点在数据中的位置转化为在界面中的位置
	function position_x(number_x){ return left+number_x*padding;}  
	function position_y(number_y){ return 80+number_y*listPadding;}  //Number（）也不行
	
	
	//画一个基本矩形
	function write_simpleRect(id,number_x,number_y,textData){//画矩形
		var textRect = svg.append("rect").attr("id","rect"+id)
		   .attr("x",position_x(number_x)).attr("y",position_y(number_y)+listPadding)
		   .attr("width",rectWidth).attr("height",rectHeight)
		   .attr("stroke","white").attr("fill", color.data)
		   .transition().duration(drawTime)
		   .attr("stroke","white").attr("fill", color.data)
		   .attr("x",position_x(number_x)).attr("y",position_y(number_y))
		   .delay(drawTime)
		
		
		var rectNext=svg.append("rect").attr("id","rectNext"+id)
						   .attr("x",position_x(number_x)+rectWidth).attr("y",position_y(number_y)+listPadding)
						   .attr("width",nextWidth).attr("height",rectHeight)
						   .attr("fill", color.next)
					       .attr("stroke", color.stroke)
						   .transition().duration(drawTime)                              
						   .attr("fill", color.next)
					       .attr("stroke", color.stroke)
						   .attr("x",position_x(number_x)+rectWidth).attr("y",position_y(number_y))	
						   .delay(drawTime)
		
		var text =svg.append("text").attr("id","text"+id)
				   .attr("x",position_x(number_x)+rectWidth/3).attr("y",position_y(number_y)+rectHeight/2+listPadding) 
				   .text(textData)
				   .transition().duration(drawTime)
				   .attr("x",position_x(number_x)+rectWidth/3).attr("y",position_y(number_y)+rectHeight/2)
				   .delay(drawTime)
				   
		
	}
	//移动矩形
	function rect_move(id,number_x,number_y,delayTime){//移动一个矩形
		var textRect = d3.select("#rect"+id)
					   .transition().duration(drawTime)
					   .attr("x",position_x(number_x)).attr("y",position_y(number_y))
					   .delay(delayTime)
		var rectNext = d3.select("#rectNext"+id)
					   .transition().duration(drawTime)
					   .attr("x",position_x(number_x)+rectWidth).attr("y",position_y(number_y))
					    .delay(delayTime)
		var text = d3.select("#text"+id)
					   .transition()
					   .duration(drawTime)
					   .attr("x",position_x(number_x)+rectWidth/3).attr("y",position_y(number_y)+rectHeight/2)
					   .delay(delayTime)
	
	}
	//转化路径的d值
	//通过传递svg画布中矩形的位置来指定线的位置
	//startX，statrY-------起点矩形的位置，起点设在指针域矩形的右边界的中间，
	//endX，endY---------终点矩形的位置，起点设在数据域矩形的左边界的中间
	function transform(startY,startX,endY,endX,pathType){ 
		var x1;
		var x2;
		var x3;
		var x4;
		var y1;
		var y2;
		var y3;
		var y4;
		var dy
	  if( pathType == "line" )
	  {
		    x1=position_x(startX)+rectWidth+nextWidth;
		    y1=position_y(startY)+20;
		    x4=position_x(endX);
		    y4=position_y(endY)+20;
		   
		   x2=(2*x1+x4)/3;
		   y2=(2*y1+y4)/3;
		   x3=(x1+2*x4)/3;
		   y3=(y1+2*y4)/3;
	  }
	  
	  if( pathType == "curve" )
	  {
		   x1=position_x(startX)+rectWidth+nextWidth;
		   y1=position_y(startY)+20;
		   x4=position_x(endX);
		   y4=position_y(endY)+20;
		   
		   dy=50;
		   x2=(2*x1+x4)/3;
		   y2=y1-dy;
		   x3=(x1+2*x4)/3;
		   y3=y1-dy;
	  }
		  var d='M'+x1+','+y1+' '+'C'+x2+','+y2+' '+x3+','+y3+' '+x4+','+y4;
		  return d;           
	  }
	
	function draw_line(id,d){//画线
	  svg.append("path")
		 .attr("d",d)
		 .attr("fill","none")
		 .attr("stroke-width","1.5")
		 .attr("stroke","black")
		 .attr("marker-end","url(#arrow)")
		 .attr("id","path"+id);
	}
	
	//根据id找到线  根据d移动 线
	function move_line(id,d,delayTime){//移动线
	  svg.select("#path"+id)
		 .transition()
		 .duration(drawTime)
		 .delay(delayTime)
		 .attr("fill","none")
		 .attr("stroke-width","1.5")
		 .attr("stroke","black")
		 .attr("d",d);
	}
	
	//以下是树的接口
	//根据清除冒号的id找到它的位置
	function firstPlace(temp_id){				//根据传入的id找到其在数组中的对应坐标
		 for(var i=0;i<nowData.length;i++)			
			  for(var j=0;j<nowData[i].length;j++)
				  if(clearMaoHao(nowData[i][j].id)==temp_id)
					  return i;
		  			  }
	function sceondPlace(temp_id){				//根据传入的id找到其在数组中的对应坐标
		 for(var i=0;i<nowData.length;i++)			
			  for(var j=0;j<nowData[i].length;j++)
				  if(clearMaoHao(nowData[i][j].id)==temp_id)
					  return j;
		  			  }
	function firstPlace_before(temp_id){				//根据传入的id找到其在数组中的对应坐标
		 for(var i=0;i<beforeData.length;i++)			
			  for(var j=0;j<beforeData[i].length;j++)
				  if(clearMaoHao(beforeData[i][j].id)==temp_id)
					  return i;
	 }
	function sceondPlace_before(temp_id){				//根据传入的id找到其在数组中的对应坐标
		 for(var i=0;i<beforeData.length;i++)			
			  for(var j=0;j<beforeData[i].length;j++)
				  if(clearMaoHao(beforeData[i][j].id)==temp_id)
					  return j;
	 }

	function max(depth){
		  if(depth>maxDepth)
			  maxDepth=depth;
	}

	function judgeChild(parentId,id){
	 for(var i=0;i<nowData.length;i++){				//判断新增节点是左孩子还是右孩子
		  for(var j=0;j<nowData[i].length;j++)	
		  if(clearMaoHao(nowData[i][j].id)==parentId)
		  { 

			  if(clearMaoHao(nowData[i][j].letfChild)==id){
				  child="left";
				  break;
				  }
			  else{
				  child="right";
				  break;
			  }

		  }

	  }

	 }
	function isMyParent(childId,parentId){
		if(clearMaoHao(nowData[firstPlace(childId)][sceondPlace(childId)].parent)==parentId)
			return true;
		else 
			return false;
	}				

	function setTimeOut(){	
			//重新布局防止重叠
			maxDepth=0;			//初始化最大深度
			for(var i=0;i<nowData.length;i++)
				for(var j=0;j<nowData[i].length;j++)
					max(nowData[i][j].depth);	 		//得到最大深度
		     
			 setTimeout(function(){
				  /*将树的每个结点的id存入二维数组nodeOrder，下标规定从1开始*/
			    	for(var i=1;i<=nowData.length;i++){
			    		nodeOrder[i]=new Array(Math.pow(2,maxDepth));	//为每棵树创建一维数组 
			    		nodeOrder[i].fill("");
			    		NodeNumber(clearMaoHao(nowData[i-1][0].id),1,i);		//传入信息分别为每棵树根节点的id，根节点的序号1，树的序号
			    	}
			    	/*将树的每个结点在完全二叉树中对应的位置存入二维数组nodePlace,规定下标从1开始*/
			    	for(var i=1;i<=nowData.length;i++){
						nodePlace[i]=new Array();	//每棵树创建一维数组
						rootPlace=(Math.pow(2,maxDepth-1)*treeRectWidth+(Math.pow(2,maxDepth-1)-1)*25)/2-treeRectWidth/2;	//计算第一棵树根节点的坐标
						nodePlace[i][1]=left+rootPlace+(Math.pow(2,maxDepth-1)*(25+treeRectWidth))*(i-1);					//每棵树根节点的坐标
				    	NodeLocation(i);  	
				    	}
			    	sizeChange();
			 },1000);

	}
	
/**
 * 对多步调试的重画
 *//*


function treeRepainting(nowData,beforeData,action){
	test3.innerHTML="fjhgjf"
	for(var i=1;i<=nowData.length;i++){
		nodeOrder[i]=new Array();	//为每棵树创建一维数组
	NodeNumber(clearMaoHao(nowData[i-1][0].id),1,i);		//传入信息分别为每棵树根节点的id，根节点的序号1，树的序号
	}	


	for(var i=1;i<nodeOrder.length;i++){
		for(var j=1;j<=max();j++){
			for(var k=Math.pow(2,j-1),count=0;k<Math.pow(2,j);k++){
				var nodeWidth=rectWidth+2*nextWidth;
			
				var Location=0;
				var id=nodeOrder[i][k];
				var startLocation=(Math.pow(2,(max()-j))-1)*nodeWidth+(i-1)*16*nodeWidth+nextWidth;
				if(id==null)
					continue;
				if(count==0){
					Location=startLocation;
					count++;
				}
				else{
					Location=startLocation+(k-Math.pow(2,j-1))*Math.pow(2,max()+1-j)*nodeWidth;
				}
				 var rectD = svg.append("rect")						
			        .attr("fill", "white")
			         .attr("id", "rect" + id)
			        .attr("y", function(){
			            return j* listPadding;
			        })
			        .attr("x" , function() {
			            return Location+nextWidth;
			        })
			        .attr("width", rectWidth)
			        .attr("height", rectHeight)
			        .attr("fill", color.data)
			     
			    //左儿子域矩形
			    var rectL = svg.append("rect")
			        .attr("fill", "white")
			        .attr("stroke", "white")
			         .attr("id", "rectL" + id)
			        .attr("y", function(){
			        	 return j * listPadding;
			        })
			        .attr("x" , function() {
			            return Location;
			        })
			        .attr("width", nextWidth)
			        .attr("height", rectHeight)
			        .attr("fill", color.next)
			        .attr("stroke", color.stroke)
			    

			    //右儿子域矩形
			    var rectR = svg.append("rect")
			        .attr("fill", "white")
			        .attr("stroke", "white")
			        .attr("id", "rectR" +id)
			        .attr("y", function(){
			            return j * listPadding;
			        })
			        .attr("x" , function() {
			            return Location+nextWidth+rectWidth;
			        })
			        .attr("width", nextWidth)
			        .attr("height", rectHeight)
			        .attr("fill", color.next)
			        .attr("stroke", color.stroke)

			    //数据域内容
			    var textD = svg.append("text")															
			        .attr("fill", "white")
			        .attr("id", "text" +id)
			        .attr("y", j * listPadding + rectHeight/2)
			        .attr("x",function(){
			            return Location+nextWidth;
			        })
			        .attr("fill", color.text)
			        .text(id);
			}
		}
	}
	setTimeout(drawLine(nowData),500);
	//setTimeout(check(),1000);
}
function check(){
	for(var i=0;i<nowData.length;i++){
		for(var j=0;j<nowData[i].length;j++){
			var id=clearMaoHao(nowData[i][j],id)
		}
	}
}
function getParent(id){
	for
}
function drawLine(nowData){
	for(var i=0;i<nowData.length;i++){
		for(var j=1;j<nowData[i].length;j++){
			var id=clearMaoHao(nowData[i][j].id);
			var line=svg.append("path")
			 .attr("fill","none")
			 .attr("stroke-width","1.5")
			 .attr("stroke","black")
			 .attr("marker-end","url(#arrow)")
			 .attr("id","path"+id)
			 .attr("d",function(){
				 var x1=Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].parent)).getAttribute("x"))-nextWidth/2;
				 var x2=Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].id)).getAttribute("x"))+rectWidth/2;
				 if(!isLeftChild(clearMaoHao(nowData[i][j].id)))
					 x1=x1+rectWidth+nextWidth;
				var x3=(x1+x2)/2,x4=x3;
				 var y1=Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].parent)).getAttribute("y"))+rectHeight/2;
				 var y2=Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].id)).getAttribute("y"));
				var y3=(y1+y2)/2,y4=y3;
				return  "M" + x1 + "," + y1+ "C" + x3 + "," + y3 + " " + x4 + "," + y4 + " " + x2 + "," + y2;
	            
			 })
		}
	}
	}
function NodeNumber(temp_id,secondIndex,firstIndex){
	nodeOrder[firstIndex][secondIndex]=temp_id;			//直接赋与与其下标对应的值
	//左孩子的处理
	if(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].letfChild!=null){
		test2.innerHTML=firstPlace(temp_id)+"  "+sceondPlace(temp_id);
	
		NodeNumber(clearMaoHao(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].letfChild),secondIndex*2,firstIndex)				//传入左孩子的id和父亲下标的两倍，递归
	}
		else
		nodeOrder[firstIndex][secondIndex*2]=null;						//无左孩子则其左孩子对应值为"null"

	//右孩子的处理
	if(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].rightChild!=null)
		NodeNumber(clearMaoHao(nowData[firstPlace(temp_id)][sceondPlace(temp_id)].rightChild),secondIndex*2+1,firstIndex)			//传入右孩子的id和父亲下标的两倍加1，递归
	else
		nodeOrder[firstIndex][secondIndex*2+1]=null;						//无右孩子则其左孩子对应值为"null"
}	
function isLeftChild(id){
	for(var i=0;i<nowData.length;i++){
	for(var j=0;j<nowData[i].length;j++){
		if(nowData[i][j].letfChild!=null&&clearMaoHao(nowData[i][j].letfChild)==id)
			return true;
	}}
	return false;
}*/

function treeRepainting(nowData,beforeData,action){
	maxDepth=0;
	svg=d3.select("svg");
	for(var i=0;i<nowData.length;i++){
		for(var j=0;j<nowData[i].length;j++){
			var id=clearMaoHao(nowData[i][j].id);
	
	 var rectD = svg.append("rect")						
     .attr("fill", "white")
      .attr("id", "rect" + id)
     .attr("y", function(){
         return  listPadding;
     })
     .attr("x" , function() {
         return rectWidth;
     })
     .attr("width", rectWidth)
     .attr("height", rectHeight)
     .attr("fill", color.data)
  
 //左儿子域矩形
 var rectL = svg.append("rect")
     .attr("fill", "white")
     .attr("stroke", "white")
      .attr("id", "rectL" + id)
     .attr("y", function(){
     	 return listPadding;
     })
     .attr("x" , function() {
         return rectWidth;
     })
     .attr("width", nextWidth)
     .attr("height", rectHeight)
     .attr("fill", color.next)
     .attr("stroke", color.stroke)
 

 //右儿子域矩形
 var rectR = svg.append("rect")
     .attr("fill", "white")
     .attr("stroke", "white")
     .attr("id", "rectR" +id)
     .attr("y", function(){
         return  listPadding;
     })
     .attr("x" , function() {
         return rectWidth;
     })
     .attr("width", nextWidth)
     .attr("height", rectHeight)
     .attr("fill", color.next)
     .attr("stroke", color.stroke)

 //数据域内容
 var textD = svg.append("text")															
     .attr("fill", "white")
     .attr("id", "text" +id)
     .attr("y", j * listPadding + rectHeight/2)
     .attr("x",function(){
         return rectWidth;
     })
     .attr("fill", color.text)
     .text(nowData[i][j].data);
	 if(j==0)
		 continue;
	 var line=svg.append("path")
	 .attr("fill","none")
	 .attr("stroke-width","1.5")
	 .attr("stroke","black")
	 .attr("marker-end","url(#arrow)")
	 .attr("id","path"+clearMaoHao(nowData[i][j].parent)+id)
	 .attr("d",function(){
		 var x1=rectWidth;
		 var x2=rectWidth+nextWidth;
		
		var x3=(x1+x2)/2,x4=x3;
		 var y1=listPadding;
		 var y2=listPadding*2
		var y3=(y1+y2)/2,y4=y3;
		return  "M" + x1 + "," + y1+ "C" + x3 + "," + y3 + " " + x4 + "," + y4 + " " + x2 + "," + y2;
        
	 });
		}}
	 for(var i=0;i<nowData.length;i++){
		 for(var j=0;j<nowData[i].length;j++){
			 var id=clearMaoHao(nowData[i][j].id);
			 /*test2.innerHTML="jdnj";
			 test3.innerHTML="fnjd";*/
			 if(""!=nowData[i][j].letfChild&&id!=getParent(clearMaoHao(nowData[i][j].letfChild),nowData)){
					//svg.remove();
//					test3.innerHTML="nr";
					
					 var line=svg.append("path")
					 .attr("fill","none")
					 .attr("stroke-width","1.5")
					 .attr("stroke","red")
					 .attr("marker-end","url(#arrow)")
					 	 .attr("id","path"+id+clearMaoHao(nowData[i][j].letfChild))
					 .attr("d",function(){
						 var x1=rectWidth;
						 var x2=rectWidth+nextWidth;
						
						var x3=(x1+x2)/2,x4=x3;
						 var y1=listPadding;
						 var y2=listPadding*2
						var y3=(y1+y2)/2,y4=y3;
						return  "M" + x1 + "," + y1+ "C" + x3 + "," + y3 + " " + x4 + "," + y4 + " " + x2 + "," + y2;
				        
					 });
					 }
				
				else if(""!=nowData[i][j].rightChild&&id!=getParent(clearMaoHao(nowData[i][j].rightChild),nowData)){//!=getParent(clearMaoHao(nowData[i][j].rightChild),nowData)){
					
					test1.innerHTML="path"+id+clearMaoHao(nowData[i][j].rightChild);
					var line=svg.append("path")
					 .attr("fill","none")
					 .attr("stroke-width","1.5")
					 .attr("stroke","red")
					 .attr("marker-end","url(#arrow)")
						 .attr("id","path"+id+clearMaoHao(nowData[i][j].rightChild))
					 .attr("d",function(){
						 var x1=rectWidth;
						 var x2=rectWidth+nextWidth;
						
						var x3=(x1+x2)/2,x4=x3;
						 var y1=listPadding;
						 var y2=listPadding*2
						var y3=(y1+y2)/2,y4=y3;
						return  "M" + x1 + "," + y1+ "C" + x3 + "," + y3 + " " + x4 + "," + y4 + " " + x2 + "," + y2;
				        
					 });
					}
			
		 }
	 }
	setTimeOut();
	/* setTimeout(function(){
		 
		 for(var i=0;i<nowData.length;i++){
			 for(var j=0;j<nowData[i].length;j++){
				 var id=clearMaoHao(nowData[i][j].id);
				 test2.innerHTML="jdnj";
				 test3.innerHTML="fnjd";
				 if(""!=nowData[i][j].letfChild&&id!=getParent(clearMaoHao(nowData[i][j].letfChild),nowData)){
						//svg.remove();
//						test3.innerHTML="nr";
						
						 var line=svg.append("path")
						 .attr("fill","none")
						 .attr("stroke-width","1.5")
						 .attr("stroke","red")
						 .attr("marker-end","url(#arrow)")
						 .attr("id","error"+id)
						 .attr("d",function(){
							 
							 var x1=Number(document.getElementById("rect"+id).getAttribute("x"))-nextWidth/2;
							 var x2=Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].letfChild)).getAttribute("x"))+rectWidth/2
							
							var x3=(x1+x2)/2,x4=x3;
							 var y1=Number(document.getElementById("rect"+id).getAttribute("y"))+rectHeight/2;
							 var y2=Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].letfChild)).getAttribute("y"));
							var y3=(y1+y2)/2,y4=y3;
							return  "M" + x1 + "," + y1+ "C" + x3 + "," + y3 + " " + x4 + "," + y4 + " " + x2 + "," + y2;
					        
						 });
						 }
					
					else if(""!=nowData[i][j].rightChild&&id!=getParent(clearMaoHao(nowData[i][j].rightChild),nowData)){//!=getParent(clearMaoHao(nowData[i][j].rightChild),nowData)){
						
						
						var line=svg.append("path")
						 .attr("fill","none")
						 .attr("stroke-width","1.5")
						 .attr("stroke","red")
						 .attr("marker-end","url(#arrow)")
						 .attr("id","error"+id)
						 .attr("d",function(){
							 var x1=Number(document.getElementById("rect"+id).getAttribute("x"))+rectWidth+nextWidth/2;
							 var x2=Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].letfChild)).getAttribute("x"))+rectWidth/2
							
							var x3=(x1+x2)/2,x4=x3;
							 var y1=Number(document.getElementById("rect"+id).getAttribute("y"))+rectHeight/2;
							 var y2=Number(document.getElementById("rect"+clearMaoHao(nowData[i][j].letfChild)).getAttribute("y"));
							var y3=(y1+y2)/2,y4=y3;
							return  "M" + x1 + "," + y1+ "C" + x3 + "," + y3 + " " + x4 + "," + y4 + " " + x2 + "," + y2;
					        
						 });
						}
				 var parentId=clearMaoHao(nowData[i][j].id);
				 var id=clearMaoHao(nowData[i][j].id);
				 if(isExceptionLine(id,parentId)==true){
					 
					 var line=svg.append("path")
					 .attr("fill","none")
					 .attr("stroke-width","1.5")
					 .attr("stroke","black")
					 .attr("marker-end","url(#arrow)")
					 .attr("id","path"+id)
					 .attr("d",function(){
						 var x1=Number(document.getElementById("rect"+parentId).getAttribute("x"))-nextWidth/2;
						 var x2=Number(document.getElementById("rect"+id).getAttribute("x"))+rectWidth/2;
						 
						var x3=(x1+x2)/2,x4=x3;
						 var y1=Number(document.getElementById("rect"+parentId).getAttribute("y"))+rectHeight/2;
						 var y2=Number(document.getElementById("rect"+id).getAttribute("y"));
						var y3=(y1+y2)/2,y4=y3;
						return  "M" + x1 + "," + y1+ "C" + x3 + "," + y3 + " " + x4 + "," + y4 + " " + x2 + "," + y2;
			            
					 });
				 }
			 }
		 }
	 },300+drawTime)*/
	
}
function getParent(tempId,nowData){
	for(var i=0;i<nowData.length;i++){
		for(var j=0;j<nowData[i].length;j++){
			if(tempId==clearMaoHao(nowData[i][j].id)){
				return clearMaoHao(nowData[i][j].parent);
			}
		}
	}
}

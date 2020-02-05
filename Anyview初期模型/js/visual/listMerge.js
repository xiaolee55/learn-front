function wholeListMove(){
	var actionSet = document.getElementById("actionSet").innerHTML;		//取得操作区内容
	var action = JSON.parse(actionSet);		//转化为json对象

    var changeIdRow;   
    var nextIdRow; 
    for(var i = 0; i < beforeData.length; i++){
    	   for(var j = 0; j < beforeData[i].length; j++){
    		   var aimId = clearMaoHao(beforeData[i][j].id);		
    		   if(aimId == action.changeId) changeIdRow=i;
    		   if(aimId == action.nextId) nextIdRow=i;
    	   }
    }
	for(var k=0;k<nowData.length;k++){


			 for(var i = 0; i < nowData[k].length; i++){

			        var short_id = clearMaoHao(nowData[k][i].id);			
			                	
			                //移动数据域矩形
			                svg.select("#rect" + short_id )
			                    .transition()
			                    .delay(drawTime*2)
			                    .duration(drawTime)
			                    .attr("y",function(){
			                        return getYLocat(short_id,nowData);
			                    });

			                //移动next域矩形
			                svg.select("#rectNext" + short_id )
			                    .transition()
			                    .delay(drawTime*2)
			                    .duration(drawTime)
			                    .attr("y",function(){
			                        return getYLocat(short_id,nowData);
			                    });

			                //移动数据域内容
			                svg.select("#text" +short_id )
			                    .transition()
			                    .delay(drawTime*2)
			                    .duration(drawTime)
			                    .attr("y",function(){
			                        return getYLocat(short_id,nowData) - (- rectHeight/2);
			                    });

			                //移动next域内容
			                svg.select("#textNext" + short_id)
			                    .transition()
			                    .delay(drawTime*2)
			                    .duration(drawTime)
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
			                    .delay(drawTime*2)
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
					                    .delay(drawTime*2)
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
				                    .delay(drawTime*2)
				                    .duration(drawTime)
				                	.attr("d",path)
			            	   }

			                }
			}

	}
}


function listMerge(nowData,beforeData){

    /*
     * 函数需要做的事：
     * 1、第一步，附加一个箭头直线，由改变结点位置到它next域结点的位置
     * 2、第二步，移动箭头和结点，使其到一个水平线上
     * */




    var actionSet = document.getElementById("actionSet").innerHTML;		//取得操作区内容
    var action = JSON.parse(actionSet);		//转化为json对象



    //next域改变
    svg.select("#textNext" + action.changeId)
        .text(action.nextId);


    //确定始末位置
    var startXLocat=Number(d3.select("#rect"+action.changeId).attr("x"))+rectWidth+nextWidth;
    var endXLocat=Number(d3.select("#rect"+action.nextId).attr("x"));
    var startYLocat=Number(d3.select("#rect"+action.changeId).attr("y"))+(rectHeight/2);
    var endYLocat=Number(d3.select("#rect"+action.nextId).attr("y"));
    var finalXLocat=Number(d3.select("#rect" + action.changeId).attr("x"))-(-rectWidth)-(-nextWidth)-(- arrowPadding);
    var finalYLocat=Number(d3.select("#rect" + action.changeId).attr("y"))-(- rectHeight/2);
    //曲线路径
    var path_1="M"+startXLocat+","+startYLocat+" C"+startXLocat+","+startYLocat+" "+startXLocat+","+startYLocat+" "+startXLocat+","+startYLocat;
    var path_2="M"+startXLocat+","+startYLocat+" C"+(startXLocat+endXLocat)/2+","+(startYLocat+endYLocat)/2+" C"+(startXLocat+endXLocat)/2+","+(startYLocat+endYLocat)/2 +" "+endXLocat+","+endYLocat;
    var path_3="M"+startXLocat+","+startYLocat+" C"+(startXLocat+finalXLocat)/2+","+(startYLocat+finalYLocat)/2+" "+(startXLocat+finalXLocat)/2+","+(startYLocat+finalYLocat)/2+" "+finalXLocat+","+finalYLocat;
    var num=0;
    var row=-1;  //确定待移动链表的行数
    //附加新指针
    svg.append("path")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow)")
        .attr("id", function() {
            return "path" + action.changeId;
        })
        .attr("d",path_1)
        .transition()
        .duration(drawTime)
        .attr("d",path_2)
        .transition()
        .duration(drawTime)
        .attr("d",path_3)
    //找到目标点的最终位置并移动,待修改
    for(var i=0;i<beforeData.length;i++){
        var firstId=clearMaoHao(beforeData[i][0].id);
        if(action.nextId==firstId){
            row=i;
        }
    }
    for(var j=0;j <beforeData[row].length;j++){

        var tempId=clearMaoHao(beforeData[row][j].id);
        //var changedId=clearMaoHao(nowDa
        //目标节点的整行移动

        //移动数据域矩形
        svg.select("#rect"+tempId)
            .transition()
            .delay(drawTime)
            .duration(drawTime)
            .attr("x",function(){
                return Number(getXLocat(tempId,nowData));
            })
            .attr("y",function(){
                return getYLocat(action.changeId,beforeData)
            });

        //移动next域矩形
        svg.select("#rectNext" +  tempId)
            .transition()
            .delay(drawTime)
            .duration(drawTime)
            .attr("x",function(){
                return getXLocat(tempId,nowData)+rectWidth;
            })
            .attr("y",function(){
                return getYLocat(action.changeId,beforeData)
            });

        //移动数据域内容
        svg.select("#text" + tempId)
            .transition()
            .delay(drawTime)
            .duration(drawTime)
            .attr("x",function(){
                return getXLocat(tempId,nowData)+rectWidth/3;
            })
            .attr("y",function(){
                return getYLocat(action.changeId,beforeData) - (- rectHeight/2);
            });

        //移动next域内容
        svg.select("#textNext" + tempId)
            .transition()
            .delay(drawTime)
            .duration(drawTime)
            .attr("x",function(){
                return getXLocat(tempId,nowData)+rectWidth- (-nextWidth/2);
            })
            .attr("y",function(){
                return getYLocat(action.changeId,beforeData) - (- rectHeight/2);
            });
        if(j<beforeData[row].length-1) {
            var startX = getXLocat(tempId, nowData) + rectWidth + nextWidth;
            var endX = startX + arrowPadding;
            var startY = getYLocat(action.changeId, beforeData) + rectHeight / 2;

            var path = "M" + startX + "," + startY + "C" + (startX + endX) / 2 + "," + startY + " " + (startX + endX) / 2 + "," + startY + " " + endX + "," + startY;

            //移动线条
            svg.select("#path" + tempId)
                .transition()
                .delay(drawTime)
                .duration(drawTime)
                .attr("d", path);
        }
    }
    if(beforeData[row][beforeData[row].length-1].nextId!=""){

        var listLength=beforeData[row].length;
        var lastId=clearMaoHao(beforeData[row][listLength-1].id);
        var lastNextId=clearMaoHao(beforeData[row][listLength-1].nextId);

        var startX=getXLocat(lastId,nowData)+rectWidth+nextWidth;
        var endX=getXLocat(lastNextId,nowData);
        var startY=getYLocat(action.changeId,beforeData)+rectHeight/2;
        var endY;
        var path;
        if(getYLocat(lastId,nowData)==getYLocat(lastNextId,nowData)) {
            endY = getYLocat(action.changeId, beforeData) + rectHeight / 2;
            path="M"+startX+","+startY+"C"+(startX-20)+","+(startY-80)+" "+(endX+20)+","+(endY-80)+" "+endX+","+endY;

        }
        else {
            endY = getYLocat(lastNextId, beforeData) + rectHeight / 2;
            var path="M"+startX+","+startY+"C"+(startX+endX)/2+","+(startY+endY)/2+" "+(endX+startX)/2+","+(startY+endY)/2+" "+endX+","+endY;

        }

        svg.select("#path" + lastId)
            .transition()
            .delay(drawTime)
            .duration(drawTime)
            .attr("d", path);

    }
    for(var i=0;i<beforeData.length;i++) {
        if (i == row) continue;
        var listLength = beforeData[i].length;
        var lastId = clearMaoHao(beforeData[i][listLength - 1].id);
        var lastNextId = clearMaoHao(beforeData[i][listLength - 1].nextId);
        if (getYLocat(action.changeId, nowData) == getYLocat(lastNextId, nowData)) {
            var startX = getXLocat(lastId, nowData) + rectWidth + nextWidth;
            var startY = getYLocat(lastId, beforeData) + rectHeight / 2;
            var endX = getXLocat(lastNextId, nowData);
            var endY = getYLocat(action.changeId, beforeData) + rectHeight / 2;
            var path = "M" + startX + "," + startY + "C" + (startX + endX) / 2 + "," + (startY + endY) / 2 + " " + (endX + startX) / 2 + "," + (startY + endY) / 2 + " " + endX + "," + endY;
            svg.select("#path" + lastId)
                .transition()
                .delay(drawTime)
                .duration(drawTime)
                .attr("d", path);
        }

    }
    
    
   

    wholeListMove();



}












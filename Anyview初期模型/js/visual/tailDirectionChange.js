/*
����β���nextָ��ָ��ı�

 */
//ָ����������ڵ�
function tailSelf(nowData,beforeData,action){
    var str="";
    for(var i=0;i<beforeData.length;i++){
        for(var j=0;j<beforeData[i].length;j++){
            str+=beforeData[i][j].id+"--row"+i+"--index"+j+"\n";
        }
    }
    var test3 = document.getElementById("test3");   //ȡ�ò�����id
    test3.innerHTML  =  "tailSelf--"+str;
    var startX=getXLocat(action.changeId,nowData)+rectWidth+nextWidth;
    var endX=getXLocat(action.nextId,nowData);
    var startY=getYLocat(action.changeId,nowData)+rectHeight/2;
    var endY=getYLocat(action.nextId,nowData)+rectHeight/2;
    var path="M"+startX+","+startY+" C"+(startX-20)+","+(startY-100)+" "+(endX+20)+","+(startY-100)+" "+endX+","+endY;

    svg.select("#path"+action.changeId)
        .transition()
        .duration(drawTime)
        .attr("d",path);
}
function tailOtherNotFirst(nowData,beforeData,action){
    var startX=getXLocat(action.changeId,nowData)+rectWidth+nextWidth;
    var endX=getXLocat(action.nextId,nowData);
    var startY=getYLocat(action.changeId,nowData)+rectHeight/2;
    var endY=getYLocat(action.nextId,nowData)+rectHeight/2;
    var path="M"+startX+","+startY+" C"+(startX+endX)/2+","+(startY+endY)/2+" "+(endX+startX)/2+","+(startY+endY)/2+" "+endX+","+endY;

    svg.select("#path"+action.changeId)
        .transition()
        .duration(drawTime)
        .attr("d",path);
}

//ָ����������ڵ�
function tailOtherFirst(nowData,beforeData,action){
    var str="";
    var num=0;
  
    var test3 = document.getElementById("test3");   //ȡ�ò�����id
    test3.innerHTML  =  "tailSelf--"+str;
    var row;        //����
    var startX=getXLocat(action.changeId,beforeData)+rectWidth+nextWidth;
    var endX=getXLocat(action.nextId,beforeData);
    var startY=getYLocat(action.changeId,beforeData)+rectHeight/2;
    var endY=getYLocat(action.nextId,beforeData)+rectHeight/2;
        //������յ�
    var path_1="M"+startX+","+startY+" C"+(startX+endX)/2+","+(startY+endY)/2+" "+(endX+startX)/2+","+(startY+endY)/2+" "+endX+","+endY;


    svg.select("#path"+action.changeId)
        .transition()
        .duration(drawTime)
        .attr("d",path_1);
    endX=getXLocat(action.nextId,nowData);
    endY=getYLocat(action.changeId,beforeData)+rectHeight/2;
    //�ı��յ�
    var path_2="M"+startX+","+startY+" C"+(startX+endX)/2+","+(startY+endY)/2+" "+(endX+startX)/2+","+(startY+endY)/2+" "+endX+","+endY;
    svg.select("#path"+action.changeId)
        .transition()
        .delay(drawTime)
        .duration(drawTime)
        .attr("d",path_2);
    //�ҵ�Ŀ��������λ�ò��ƶ�,���޸�
    for(var i=0;i<beforeData.length;i++){
        var firstId=clearMaoHao(beforeData[i][0].id);
        if(action.nextId==firstId){
            row=i;
        }
    }
    for(var j=0;j <beforeData[row].length;j++){

        var tempId=clearMaoHao(beforeData[row][j].id);
        //var changedId=clearMaoHao(nowDa
        //Ŀ��ڵ�������ƶ�

        //�ƶ����������
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

        //�ƶ�next�����
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

        //�ƶ�����������
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

        //�ƶ�next������
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

        //������
        if(j<beforeData[row].length-1) {
            var startX = getXLocat(tempId, nowData) + rectWidth + nextWidth;
            var endX = startX + arrowPadding;
            var startY = getYLocat(action.changeId, beforeData) + rectHeight / 2;

            var path = "M" + startX + "," + startY + "C" + (startX + endX) / 2 + "," + startY + " " + (startX + endX) / 2 + "," + startY + " " + endX + "," + startY;

            //�ƶ�����
            svg.select("#path" + tempId)
                .transition()
                .delay(drawTime)
                .duration(drawTime)
                .attr("d", path);
        }
    }

    //����β���next��ǿյ���
    if(beforeData[row][beforeData[row].length-1].nextId!=""){

        var listLength=beforeData[row].length;
        var lastId=clearMaoHao(beforeData[row][listLength-1].id);
        var lastNextId=clearMaoHao(beforeData[row][listLength-1].nextId);

        var startX=getXLocat(lastId,nowData)+rectWidth+nextWidth;
        var endX=getXLocat(lastNextId,nowData);
        var startY=getYLocat(action.changeId,beforeData)+rectHeight/2;
        var endY;
        var path;

        //nextָ��ָ����������ڵ�
        if(getYLocat(lastId,nowData)==getYLocat(lastNextId,nowData)) {
            endY = getYLocat(action.changeId, beforeData) + rectHeight / 2;
            path="M"+startX+","+startY+"C"+(startX-20)+","+(startY-80)+" "+(endX+20)+","+(endY-80)+" "+endX+","+endY;

        }

        //nextָ��ָ����������ڵ�
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

    //������������βԪ�ڵ�nextָ��ָ��
    for(var i=0;i<beforeData.length;i++) {
        if (i == row||i==(getYLocat(action.changeId,beforeData)/listPadding-1) )continue;
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
    confirmLocation(nowData,drawTime*2,drawTime);
}
function confirmLocation(dataSet,delayTime,durationTime) {

    for (var i = 0; i < dataSet.length; i++) {
        for (var j = 0; j < dataSet[i].length; j++) {
            var currentId = clearMaoHao(dataSet[i][j].id);
            var nextId=clearMaoHao(dataSet[i][j].nextId);
            svg.select("#rect" +currentId)
                .transition()

                .delay(delayTime)
                .duration(durationTime)
                .attr("x",getXLocat(currentId,nowData))
                .attr("y",getYLocat(currentId,nowData));
            svg.select("#rectNext"+currentId)
                .transition()
                .delay(delayTime)

                .duration(durationTime)
                .attr("x",function(){
                    return getXLocat(currentId,nowData)+rectWidth;
                })
                .attr("y",getYLocat(currentId,nowData));
            svg.select("#text"+currentId)
                .transition()
                .delay(delayTime)
                .duration(durationTime)
                .attr("x",function(){
                    return getXLocat(currentId,nowData)+rectWidth/3;
                })
                .attr("y",function(){
                    return getYLocat(currentId,nowData)+rectHeight/2
                });
            var startX=getXLocat(currentId,nowData)+rectWidth+nextWidth;
            var endX=startX+arrowPadding;
            var startY=getYLocat(currentId,nowData)+rectHeight/2;
            var endY=startY;
            var path="M"+startX+","+startY+"C"+(startX+endX)/2+","+startY+" "+(startX+endX)/2+","+startY+" "+endX+","+startY;
            if(j<nowData[i].length-1){
                svg.select("#path"+currentId)
                    .transition()
                    .delay(delayTime)

                    .duration(durationTime)
                    .attr("d",path);
            }
            else if(nextId!=""){
                endX=getXLocat(nextId,nowData);
                endY=getYLocat(nextId,nowData)+rectHeight/2;
                if(getYLocat(currentId,nowData)!=getYLocat(nextId,nowData)) {
                    path = "M" + startX + "," + startY + "C" + (startX + endX) / 2 + "," + (endY+startY)/2 + " " + (startX + endX) / 2 + "," + (startY+endY)/2 + " " + endX + "," + endY;
                }
                else{
                    path="M" + startX + "," + startY + "C" + (startX -20) + "," + (startY-80) + " " + (endX+20) + "," + (startY-80) + " " + endX + "," + endY;

                }
                svg.select("#path"+currentId)
                    .transition()
                    .delay(delayTime)
                    .duration(durationTime)
                    .attr("d",path);
            }
        }
    }
}
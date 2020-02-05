	//指针单独变化相关变量
    var beLen=0
    var nowLen=0;
    var beNode=0;
    var nowNode=0;
    var changeId,decId,creId,temp,pointId;
    var map=new Map();
function JudgeNoChange(){	//给改变指针单独增加动作
for(var i=0;i<beforeData.length;i++)			//记录beforeData的外部指针总数量
    for(var j=0;j<beforeData[i].length;j++){
        beLen+=beforeData[i][j].point.length;
        beNode++;	
    }
            
for(var i=0;i<nowData.length;i++)				//记录nowData的外部指针总数量
    for(var j=0;j<nowData[i].length;j++){
            nowLen+=nowData[i][j].point.length;
            nowNode++;
    }
test3.innerHTML= "beLen="+beLen+"nowLen="+nowLen+"beNode="+beNode+"nowNode="+nowNode;
if(beLen<nowLen){
    for(var i=0;i<beforeData.length;i++)				//定位变化结点
        for(var j=0;j<beforeData[i].length;j++)
            for(var k=0;k<beforeData[i][j].point.length;k++)
                map.set(beforeData[i][j].point[k],clearMaoHao(beforeData[i][j].id));
    outer:
    for(var i=0;i<nowData.length;i++)
        for(var j=0;j<nowData[i].length;j++)
            for(var k=0;k<nowData[i][j].point.length;k++)	
                if(!map.get(nowData[i][j].point[k])){
                    changeId=clearMaoHao(nowData[i][j].id);
                    pointId=nowData[i][j].point[k];
                    break outer;
                    }
    action.action="pointCreate";
    }
else if(beLen>nowLen){
    for(var i=0;i<nowData.length;i++)
        for(var j=0;j<nowData[i].length;j++)
            for(var k=0;k<nowData[i][j].point.length;k++)
                map.set(nowData[i][j].point[k],clearMaoHao(nowData[i][j].id));
    outer2:
    for(var i=0;i<beforeData.length;i++)
        for(var j=0;j<beforeData[i].length;j++)
            for(var k=0;k<beforeData[i][j].point.length;k++)
                if(!map.get(beforeData[i][j].point[k])){
                    changeId=clearMaoHao(beforeData[i][j].id);
                    pointId=beforeData[i][j].point[k];
                    break outer2;
                }				
    action.action="pointDecrease";
}
else{
    for(var i=0;i<beforeData.length;i++)
        for(var j=0;j<beforeData[i].length;j++)
            for(var k=0;k<beforeData[i][j].point.length;k++)
                map.set(beforeData[i][j].point[k],clearMaoHao(beforeData[i][j].id));
    
    outer3:
    for(var i=0;i<nowData.length;i++)
        for(var j=0;j<nowData[i].length;j++)
            for(var k=0;k<nowData[i][j].point.length;k++)
                if((temp=map.get(nowData[i][j].point[k]))!=clearMaoHao(nowData[i][j].id)){
                    decId=temp;
                    creId=clearMaoHao(nowData[i][j].id);
                    pointId=nowData[i][j].point[k];
                    break outer3;
                }				
    action.action="pointMove";
}
map.clear();
beLen=0;
nowLen=0;
beNode=0;
nowNode=0;
}
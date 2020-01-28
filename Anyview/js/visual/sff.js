



var svgWidth = 2000;	//������
var svgHeight = 1000;	//������




function addOne(action ,nowData,beforeData,svg){

    /*
     *ҳ��׼��
     */
    var rectHeight = 50;    //��������θ�
    var left = 100;         //�߽����
    var top = 200;     //�ϱ߽߱�
    var rectWidth = 60;     //��������ο�
    var nextWidth = rectWidth/2;       //next���
    var padding = rectWidth + nextWidth + 30;      //���
    var listPadding = 150;      //������
    var color = {data:"steelblue", next:"white", text:"black", stroke: "steelblue", line:"black",};     //��ɫ
    var drawTime = 1000;        //����ʱ��
    var drawHeight = 0;     //��

    if(beforeData != null){
        drawHeight = beforeData.length;
    }else{
        drawHeight = 0;
    }

    svg.append("rect");

    //������
    var rectD = svg.append("rect")
        .attr("fill", "white")
        .transition()
        .duration(drawTime)
        .attr("y", function(){
            return (drawHeight + 2) * listPadding;
        })
        .attr("x" , function() {
            return left;
        })
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("fill", color.data)
        .attr("id", "rect" + action.changeId);


    rectD.transition()
        .duration(drawTime)
        .attr("y", (drawHeight + 1) * listPadding);

    //next��
    var rectN = svg.append("rect")
        .attr("fill", "white")
        .attr("stroke", "white")
        .transition()
        .duration(drawTime)
        .attr("y", function(){
            return (drawHeight + 2) * listPadding;
        })
        .attr("x" , function() {
            return left + rectWidth;
        })
        .attr("width", nextWidth)
        .attr("height", rectHeight)
        .attr("fill", color.next)
        .attr("stroke", color.stroke)
        .attr("id", "rectNext" + action.changeId);


    rectN.transition()
        .duration(drawTime)
        .attr("y", (drawHeight + 1) * listPadding);

    //����������
    var textD = svg.append("text")
        .text(action.dataText)
        .attr("fill", color.text)
        .transition()
        .duration(drawTime)
        .attr("y", (drawHeight + 2) * listPadding + rectHeight/2)
        .attr("x",function(){
            return left + rectWidth/2;
        })
        .attr("fill", color.text)
        .text(action.dataText)
        .attr("id", "text" + action.changeId);


    textD.transition()
        .duration(drawTime)
        .attr("y", (drawHeight + 1) * listPadding + rectHeight/2);

    //next������
    var textN = svg.append("text")
        .text(action.dataText)
        .attr("fill", color.text)
        .transition()
        .duration(drawTime)
        .attr("y", (drawHeight + 2) * listPadding + rectHeight/2)
        .attr("x",function(){
            return left + rectWidth + nextWidth/2;
        })
        .attr("fill", color.text)
        .text(function () {
            if( action.nextId == "") return "^";
            return action.nextId;
        })
        .attr("id", function() {
            return "textNext" + action.changeId;
        });

    textN.transition()
        .duration(drawTime)
        .attr("y", (drawHeight + 1) * listPadding + rectHeight/2);




}

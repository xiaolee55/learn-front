var i=0,flag=0;
var data=[[{"id":"main:13","mainPrior":"","otherPrior":[],"dataText":"1.0","nextId":""}]];
var data1=[[{"id":"main:13","mainPrior":"","otherPrior":[],"dataText":"1.0","nextId":"main:16"},
			{"id":"main:16","mainPrior":"main:13","otherPrior":[],"dataText":"2.0","nextId":""}]];
var data2=[[{"id":"main:13","mainPrior":"","otherPrior":[],"dataText":"1.0","nextId":"main:16"},
			{"id":"main:16","mainPrior":"main:13","otherPrior":[],"dataText":"2.0","nextId":"main:19"},
			{"id":"main:19","mainPrior":"main:16","otherPrior":[],"dataText":"3.0","nextId":""}]];
var data3=[[{"id":"main:13","mainPrior":"","otherPrior":[],"dataText":"1.0","nextId":"main:16"},
		{"id":"main:16","mainPrior":"main:13","otherPrior":["main:19"],"dataText":"2.0","nextId":"main:19"},
		{"id":"main:19","mainPrior":"main:16","otherPrior":[],"dataText":"3.0","nextId":"main:16"}]]

var linkAction=[
{"action":"addOne","changeId":"main13","dataText":"1.0","beforeNextId":null,"nextId":null},
{"action":"addOne","changeId":"main16","dataText":"2.0","beforeNextId":null,"nextId":null},
{"action":"addOne","changeId":"main19","dataText":"3.0","beforeNextId":null,"nextId":null},
{"action":"gList","changeId":"main19","dataText":"3.0","beforeNextId":"","nextId":"main16"}
]

debug.onclick=function(){
	switch(i){
		case 0: document.getElementById("dataSet").innerHTML=JSON.stringify(data);
				document.getElementById("actionSet").innerHTML=JSON.stringify(linkAction[i++]);
				break;
		case 1: document.getElementById("dataSet").innerHTML=JSON.stringify(data1);
				document.getElementById("actionSet").innerHTML=JSON.stringify(linkAction[i++]);
				break;
		case 2: document.getElementById("dataSet").innerHTML=JSON.stringify(data2);
				document.getElementById("actionSet").innerHTML=JSON.stringify(linkAction[i++]);	
				break;
		case 3: document.getElementById("dataSet").innerHTML=JSON.stringify(data3);
				document.getElementById("actionSet").innerHTML=JSON.stringify(linkAction[i++]);
				break;
	}	
	requestLayoutAndDraw();
}
    
    var rectHeight = 40;    //矩形高
    var left = 50;         //矩形左边边界
    var top =20;     //矩形上边边界
    var rectWidth = 40;     //数据域矩形宽度
    var nextWidth = rectWidth/2;       //指针域宽度
    var arrowPadding = 40;      //箭头长度
    var padding = rectWidth + nextWidth + arrowPadding;      //结点加结点间隔宽度
    var listPadding = 80;      //链表间宽度
    var color = {data:"steelblue", next:"white", text:"black", stroke: "steelblue", line:"black",};     //颜色
    var drawTime = 1000;        //作画时间
    var drawHeight = 0;     //高度层次

	var svgWidth = visual.offsetWidth;	//画布长
	var svgHeight =  visual.offsetHeight;	//画布高
		
	var treeRectWidth=80;
	var nodeOrder=new Array();							//用于存放树结点的顺序
 	var nodePlace=new Array();							//用于存放树结点的最终位置
 	var rootPlace;
 	var exceptionLineArray=new Array();
 	var elCount=0;
 	var maxDepth=0;
 	var sameFlag;
 	var sameParent;
	var changePoint;			//存放指针改变的结点的ID

	var leakArray_row=0;							//用于泄露数组行数的自增
	var leakArray_line=-1;							//用于泄露数组列数的自增	
	var leakArray = new Array();					//用于存放泄露数据的数组
		leakArray[0]=new Array();

	//绑定画布
	var svg = d3.select("#visual")
            .append("svg")
            .attr("id","viSvg")
	//箭头1
    var defs = svg.append("defs");
    var arrowMarker = defs.append("marker")
        .attr("id", "arrow")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", "10")
        .attr("markerHeight", "10")
        .attr("viewBox", "0 0 12 12")
        .attr("refX", "6")
        .attr("refY", "6")
        .attr("orient", "auto");

    var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";

    arrowMarker.append("path")
        .attr("d", arrow_path)
        .attr("fill", "#0d1213");
    //标志变化节点的指针
  
    function clearMaoHao(temp) {
        var temp1 = temp.split(":");
        var temp2 = temp1[0] + temp1[1];
        return temp2;
    }
    
    var beforeData = null; 		//上一次数据
	var nowData = null;		//此次数据
	var action = null;		//初始化操作          
							//action本应该写成actionData，因为太多函数已经用错，就继续沿用。以此备注
	
	function requestLayoutAndDraw(){	
		var dataSet = document.getElementById("dataSet");		//取得数据id
		var dataSetData = dataSet.innerHTML;		//取得dataSet数据
		var actionSet = document.getElementById("actionSet");		//取得操作区id
		var actionSetData = actionSet.innerHTML;		//取得actionSet的数据
		action =JSON.parse(actionSetData);		//转化actionSetData数据
		nowData =JSON.parse(dataSetData);		//转化dataSetData数
		console.log(nowData);

		analyAction(action ,nowData,beforeData);				//分析数据操作，并选择相应的处理函数

		beforeData = nowData;			//处理结束，将此次数据保存

	}
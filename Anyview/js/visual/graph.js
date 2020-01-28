/**
 * 图的可视化
 */



function graph(){
	
	var test3 = document.getElementById("test3");	//取得测试区id
	test3.innerHTML  =  "我是图啊";


	var width = 500;
	var height = 500;
	
    var dataSet = document.getElementById("dataSet").innerHTML;		//取得操作区内容
    var data = JSON.parse(dataSet);		//转化为json对象
    
    var nodes = data.nodes;				//顶点集
    var edges = data.edges;				//边集
    
    var force = d3.layout.force()
				.nodes(nodes)		//指定节点数组
				.links(edges)		//指定连线数组
				.size([width,height])	//指定范围
				.linkDistance(150)	//指定连线长度
				.charge(-400);	//相互之间的作用力

	force.start();	//开始作用
	

	//添加连线		
	var svg_edges = svg.selectAll("line")
					.data(edges)
					.enter()
					.append("line")
					.style("stroke","#ccc")
					.style("stroke-width",1);
	
	var color = d3.scale.category20();
		
	//添加节点			
	var svg_nodes = svg.selectAll("circle")
					.data(nodes)
					.enter()
					.append("circle")
					.attr("r",20)
					.style("fill",function(d,i){
						return color(i);
					})
					.call(force.drag);	//使得节点能够拖动
	
	//添加描述节点的文字
	var svg_texts = svg.selectAll("text")
					.data(nodes)
					.enter()
					.append("text")
					.style("fill", "black")
					.attr("dx", -2)
					.attr("dy", 8)
					.text(function(d){
						return d.name;
					});
			
	
	force.on("tick", function(){	//对于每一个时间间隔
	
	 //更新连线坐标
	 svg_edges.attr("x1",function(d){ return d.source.x; })
	 		.attr("y1",function(d){ return d.source.y; })
	 		.attr("x2",function(d){ return d.target.x; })
	 		.attr("y2",function(d){ return d.target.y; });
	 
	 //更新节点坐标
	 svg_nodes.attr("cx",function(d){ return d.x; })
	 		.attr("cy",function(d){ return d.y; });
	
	 //更新文字坐标
	 svg_texts.attr("x", function(d){ return d.x; })
	 	.attr("y", function(d){ return d.y; });
	});

    
   

}
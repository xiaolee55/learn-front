/**
 * 我真的不会写代码
 */
function pointCreate(){
	test3.innerHTML=changeId+"--"+pointId;
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
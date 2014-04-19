// Pie charts for gender

nv.addGraph(function() {
  var chart = nv.models.pieChart()
	  .x(function(d) { return d.label })
	  .y(function(d) { return d.value })
	  .showLabels(true)
	  .labelThreshold(.05)  // minimum slice size for labels
	  .labelType("percent"); //label display, either "key", "value" or "percent"

 
	for (i=0; i< 9; i++)
	{
		var id = i +1;
		
		d3.select("#chartg"+ id + " svg")
			.datum(dataG[i])
			.transition().duration(350)
			.call(chart);
			
		var makeLegendG = new nv.models.legend()
		  .key(function(d) { return d.label; });
		  
	 //   svg.append("g").attr("class", "legend")
	//      .datum(dataG[i].values) 
	//      .transition().duration(500);
	//      .call(makeLegendG); 
		  
	   
	}
  return chart;
});
	
	
//Donut charts for species

nv.addGraph(function() {
  var charts = d3.range(1,9);
  var chart = nv.models.pieChart()
	  .x(function(d) { return d.label })
	  .y(function(d) { return d.value })
	  .showLabels(true)     
	  .labelThreshold(.05) 
	  .labelType("percent") 
	  .donut(true)          
	  .donutRatio(0.35)     //donut hole size
 

	 for (i=0; i< 9; i++)
	{
		var id = i +1;
		
		d3.select("#chart" + id + " svg")
			.datum(dataS[i])
			.transition().duration(350)
			.call(chart);
			
		  var makeLegendS = nv.models.legend()
		  .key(function(d) { return d.label; });
		  
	  //    svg.append("g").attr("class", "legend")
	  //    .datum(dataS[i].values) 
	  //    .transition().duration(500);
	  //    .call(makeLegendS); 
	}
  return chart;
});

var sampleCount = [192, 52, 56, 19,33,90,22,54,24];

var sampleTotalCount= sampleCount.reduce(function(a,b){
	return a + b});

var species = ["amgp", "dunl", "lbdo", "pesa","reph","rnph","rutu","sesa","wesa","wrsa"];

var dataS = [
	[
	  {"label": species[0], "value" : 10 } , 
	  {"label": species[1], "value" : 60 } , 
	  {"label": species[2], "value" : 38 } , 
	  {"label": species[3], "value" : 19 } , 
	  {"label": species[4], "value" : 20 } , 
	  {"label": species[5], "value" :  5 } , 
	  {"label": species[6], "value" :  1 } , 
	  {"label": species[7], "value" : 31}, 
	  {"label": species[8], "value" :  7 }, 
	  {"label": species[9], "value" :  1 }
	],
	[
	  {"label": species[0], "value" : 0 } , 
	  {"label": species[1], "value" : 8 } , 
	  {"label": species[2], "value" : 0 } , 
	  {"label": species[3], "value" : 13 } , 
	  {"label": species[4], "value" : 5 } , 
	  {"label": species[5], "value" : 5 } , 
	  {"label": species[6], "value" : 0 } , 
	  {"label": species[7], "value" : 21 }, 
	  {"label": species[8], "value" : 0 }, 
	  {"label": species[9], "value" : 0 }
	],
	[
	  {"label": species[0], "value" : 0 } , 
	  {"label": species[1], "value" : 16 } , 
	  {"label": species[2], "value" : 0 } , 
	  {"label": species[3], "value" : 0 } , 
	  {"label": species[4], "value" : 0 } , 
	  {"label": species[5], "value" : 7 } , 
	  {"label": species[6], "value" : 0 } , 
	  {"label": species[7], "value" : 20 }, 
	  {"label": species[8], "value" : 13 }, 
	  {"label": species[9], "value" : 0 }
	],
	[
	  {"label": species[0], "value" : 0 } , 
	  {"label": species[1], "value" : 19 } , 
	  {"label": species[2], "value" : 0 } , 
	  {"label": species[3], "value" : 0 } , 
	  {"label": species[4], "value" : 0 } , 
	  {"label": species[5], "value" : 0 } , 
	  {"label": species[6], "value" : 0 } , 
	  {"label": species[7], "value" : 0 }, 
	  {"label": species[8], "value" : 0 }, 
	  {"label": species[9], "value" : 0 }
	],
	[
	  {"label": species[0], "value" : 0 } , 
	  {"label": species[1], "value" : 3 } , 
	  {"label": species[2], "value" : 0 } , 
	  {"label": species[3], "value" : 2 } , 
	  {"label": species[4], "value" : 4 } , 
	  {"label": species[5], "value" : 1 } , 
	  {"label": species[6], "value" : 1 } , 
	  {"label": species[7], "value" : 22 }, 
	  {"label": species[8], "value" : 0 }, 
	  {"label": species[9], "value" : 0 }
	],
	[
	  {"label": species[0], "value" : 0 } , 
	  {"label": species[1], "value" : 23 } , 
	  {"label": species[2], "value" : 0 } , 
	  {"label": species[3], "value" : 0 } , 
	  {"label": species[4], "value" : 8 } , 
	  {"label": species[5], "value" : 6 } , 
	  {"label": species[6], "value" : 0 } , 
	  {"label": species[7], "value" : 53 }, 
	  {"label": species[8], "value" : 0 }, 
	  {"label": species[9], "value" : 0 }
	],
	[
	  {"label": species[0], "value" : 0 } , 
	  {"label": species[1], "value" : 0 } , 
	  {"label": species[2], "value" : 0 } , 
	  {"label": species[3], "value" : 7 } , 
	  {"label": species[4], "value" : 0 } , 
	  {"label": species[5], "value" : 8 } , 
	  {"label": species[6], "value" : 0 } , 
	  {"label": species[7], "value" : 7 }, 
	  {"label": species[8], "value" : 0 }, 
	  {"label": species[9], "value" : 0 }
	],
	[
	  {"label": species[0], "value" : 0 } , 
	  {"label": species[1], "value" : 0 } , 
	  {"label": species[2], "value" : 0 } , 
	  {"label": species[3], "value" : 0 } , 
	  {"label": species[4], "value" : 0 } , 
	  {"label": species[5], "value" : 14 } , 
	  {"label": species[6], "value" : 0 } , 
	  {"label": species[7], "value" : 12 }, 
	  {"label": species[8], "value" : 28 }, 
	  {"label": species[9], "value" : 0 }
	],
	[
	  {"label": species[0], "value" : 0 } , 
	  {"label": species[1], "value" : 24 } , 
	  {"label": species[2], "value" : 0 } , 
	  {"label": species[3], "value" : 0 } , 
	  {"label": species[4], "value" : 0 } , 
	  {"label": species[5], "value" : 0 } , 
	  {"label": species[6], "value" : 0 } , 
	  {"label": species[7], "value" : 0 }, 
	  {"label": species[8], "value" : 0 }, 
	  {"label": species[9], "value" : 0 }
	]
	];
var gender = ["0", "1", "5", "female","male","u","(blank)"];

var dataG = [
	[
	  {"label": gender[0], "value" : 106 } , 
	  {"label": gender[1], "value" : 0 } , 
	  {"label": gender[2], "value" : 0 } , 
	  {"label": gender[3], "value" : 52 } , 
	  {"label": gender[4], "value" : 30 } , 
	  {"label": gender[5], "value" : 2 } , 
	  {"label": gender[6], "value" : 2 } 
	],
	[
	  {"label": gender[0], "value" : 52} , 
	  {"label": gender[1], "value" : 0 } , 
	  {"label": gender[2], "value" : 0 } , 
	  {"label": gender[3], "value" : 0 } , 
	  {"label": gender[4], "value" : 0 } , 
	  {"label": gender[5], "value" : 0 } , 
	  {"label": gender[6], "value" : 0 }
	],
	[
	  {"label": gender[0], "value" : 43 } , 
	  {"label": gender[1], "value" : 0 } , 
	  {"label": gender[2], "value" : 0 } , 
	  {"label": gender[3], "value" : 6 } , 
	  {"label": gender[4], "value" : 5 } , 
	  {"label": gender[5], "value" : 2 } , 
	  {"label": gender[6], "value" : 0 } 
	],
	[
	  {"label": gender[0], "value" : 0 } , 
	  {"label": gender[1], "value" : 0 } , 
	  {"label": gender[2], "value" : 0 } , 
	  {"label": gender[3], "value" : 0 } , 
	  {"label": gender[4], "value" : 0 } , 
	  {"label": gender[5], "value" : 0 } , 
	  {"label": gender[6], "value" : 19 } 
	],
	[
	  {"label": gender[0], "value" : 32 } , 
	  {"label": gender[1], "value" : 0 } , 
	  {"label": gender[2], "value" : 0 } , 
	  {"label": gender[3], "value" : 0 } , 
	  {"label": gender[4], "value" : 0 } , 
	  {"label": gender[5], "value" : 0 } , 
	  {"label": gender[6], "value" : 0 } 
	],
	[
	  {"label": gender[0], "value" : 89 } , 
	  {"label": gender[1], "value" : 1 } , 
	  {"label": gender[2], "value" : 0 } , 
	  {"label": gender[3], "value" : 0 } , 
	  {"label": gender[4], "value" : 0 } , 
	  {"label": gender[5], "value" : 0 } , 
	  {"label": gender[6], "value" : 0 }
	],
	[
	  {"label": gender[0], "value" : 22 } , 
	  {"label": gender[1], "value" : 0 } , 
	  {"label": gender[2], "value" : 0 } , 
	  {"label": gender[3], "value" : 0 } , 
	  {"label": gender[4], "value" : 0 } , 
	  {"label": gender[5], "value" : 0 } , 
	  {"label": gender[6], "value" : 0 }
	],
	[
	  {"label": gender[0], "value" : 1 } , 
	  {"label": gender[1], "value" : 0 } , 
	  {"label": gender[2], "value" : 4 } , 
	  {"label": gender[3], "value" : 21 } , 
	  {"label": gender[4], "value" : 22 } , 
	  {"label": gender[5], "value" : 6 } , 
	  {"label": gender[6], "value" : 1 } 
	],
	[
	  {"label": gender[0], "value" : 0 } , 
	  {"label": gender[1], "value" : 0 } , 
	  {"label": gender[2], "value" : 0 } , 
	  {"label": gender[3], "value" : 0 } , 
	  {"label": gender[4], "value" : 0 } , 
	  {"label": gender[5], "value" : 0 } , 
	  {"label": gender[6], "value" : 24 }
	]
	];




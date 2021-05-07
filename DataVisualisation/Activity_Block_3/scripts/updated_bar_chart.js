var w = 600;
var h = 250;
			
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
	      11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
			
var xScale = d3.scaleBand()
	.domain(d3.range(dataset.length))
	.rangeRound([0, w])
	.paddingInner(0.05);

var yScale = d3.scaleLinear()
	.domain([0, d3.max(dataset)])
	.range([0, h]);
			
//Create SVG element
var svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

//Create bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
	return xScale(i);
   })
   .attr("y", function(d) {
	return h - yScale(d);
   })
   .attr("width", xScale.bandwidth())
   .attr("height", function(d) {
	return yScale(d);
   })
   .attr("fill", function(d) {
	return "rgb(0, 0, " + Math.round(d * 10) + ")";
   });






//On click, update with new data			
d3.select("#update")
  .on("click", function() {

        const maxValue = 25;
        //New values for dataset
        var numValues = dataset.length;
             						//Count original length of dataset
        dataset = [];  						 				//Initialize empty array
        for (var i = 0; i < numValues; i++) {				//Loop numValues times
            var newNumber = Math.floor(Math.random() * maxValue); //New random integer (0-24)
            dataset.push(newNumber);			 			//Add new number to array
        }

	//Update all rects
	svg.selectAll("rect")
	   .data(dataset)
	   .attr("y", function(d) {
   		   return h - yScale(d);
	   })
        .attr("height", function(d) {
		   return yScale(d);
	   })
	   .attr("fill", function(d) {
		   return "rgb(0, 0, " + Math.round(d * 10) + ")";
	   });

    }
)




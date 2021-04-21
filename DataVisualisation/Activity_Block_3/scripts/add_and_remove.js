var width = 600;
    height = 250;
   
var dataset = [10, 21, 12, 15, 13, 5, 6, 3, 8, 7, 9, 24, 29, 14, 16];
	

			
var xScale = d3.scaleBand()
	.domain(d3.range(dataset.length))
	.rangeRound([0,width])
	.paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
	.range([0,height]);




//Create SVG element
var svg = d3.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

//Create bars
svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
	   return xScale(i);
	})
    .attr("y", function(d) {
	   return height - yScale(d);
	})
    .attr("width", xScale.bandwidth())
	.attr("height", function(d) {
	   return yScale(d);
	})
	.attr("fill", function(d) {
	   return "rgb(0, 0, " + Math.round(d * 10) + ")";
	});



d3.select("#add").on("click", function() {

        const maxValue = 25;
        
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
        
        xScale.domain(d3.range(dataset.length));
        yScale.domain([0, d3.max(dataset)]);	

        var bars = svg.selectAll("rect")
	                  .data(dataset);


        bars.enter()								//References the enter selection (a subset of the update selection)
		.append("rect")							//Creates a new rect
		.attr("x", width)							//Sets the initial x position of the rect beyond the far right edge of the SVG
		.attr("y", function(d) {				//Sets the y value, based on the updated yScale
			return height - yScale(d);
	    })
		.attr("width", xScale.bandwidth())		//Sets the width value, based on the updated xScale
		.attr("height", function(d) {			//Sets the height value, based on the updated yScale
			return yScale(d);
		})
		.attr("fill", function(d) {				//Sets the fill value
			return "rgb(0, 0, " + Math.round(d * 10) + ")";
		})
		.merge(bars)							//Merges the enter selection with the update selection
		.transition()							//Initiate a transition on all elements in the update selection (all rects)
		.duration(1000)
		.attr("x", function(d, i) {				//Set new x position, based on the updated xScale
			return xScale(i);
		})
		.attr("y", function(d) {				//Set new y position, based on the updated yScale
			return height - yScale(d);
		})
		.attr("width", xScale.bandwidth())		//Set new width value, based on the updated xScale
		.attr("height", function(d) {			//Set new height value, based on the updated yScale
			return yScale(d);
		});

	

});

d3.select("#remove").on("click", function() { // for ease circle in

        
	    dataset.pop();

		xScale.domain(d3.range(dataset.length));
        yScale.domain([0, d3.max(dataset)]);	

		
        var bars = svg.selectAll("rect")
	                  .data(dataset);

		bars.enter()								//References the enter selection (a subset of the update selection)
		.append("rect")							//Creates a new rect
		.attr("x", width)							//Sets the initial x position of the rect beyond the far right edge of the SVG
		.attr("y", function(d) {				//Sets the y value, based on the updated yScale
			return height - yScale(d);
	    })
		.attr("width", xScale.bandwidth())		//Sets the width value, based on the updated xScale
		.attr("height", function(d) {			//Sets the height value, based on the updated yScale
			return yScale(d);
		})
		.attr("fill", function(d) {				//Sets the fill value
			return "rgb(0, 0, " + Math.round(d * 10) + ")";
		})
		.merge(bars)							//Merges the enter selection with the update selection
		.transition()							//Initiate a transition on all elements in the update selection (all rects)
		.duration(1000)
		.attr("x", function(d, i) {				//Set new x position, based on the updated xScale
			return xScale(i);
		})
		.attr("y", function(d) {				//Set new y position, based on the updated yScale
			return height - yScale(d);
		})
		.attr("width", xScale.bandwidth())		//Set new width value, based on the updated xScale
		.attr("height", function(d) {			//Set new height value, based on the updated yScale
			return yScale(d);
		});	
		
		
		
        bars.exit()								//References the enter selection (a subset of the update selection)
        .transition()
        .duration(500)
        .attr("x", -width)
        .remove();		
	
});





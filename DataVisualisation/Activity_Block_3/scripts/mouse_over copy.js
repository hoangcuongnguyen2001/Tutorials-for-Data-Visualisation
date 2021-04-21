var width = 600;
    height = 250;
  	padding = 30;

var dataset = [10, 21, 12, 15, 13, 5, 6, 3, 8, 7, 9, 24, 29, 14, 16];


var xScale = d3.scaleBand()
	.domain(d3.range(dataset.length))
	.rangeRound([padding, width - padding])
	.paddingInner(0.05);

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset)])
	           .range([height - padding, padding]);

var xAxis = d3.axisBottom().scale(xScale);
    yAxis = d3.axisLeft().scale(yScale);


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
  	   return height - yScale(d) - padding;
  	})
    .attr("width", xScale.bandwidth())
  	.attr("height", function(d) {
  	   return yScale(d);
  	})
  	.attr("fill", function(d) {
  	   return "rgb(0, 0, " + Math.round(d * 10) + ")";
  	})
  	.on("mouseover", function(d){
		d3.select(this).attr("fill", "orange");
  		var xPosition = parseFloat(d3.select(this).attr("x"));
  		var yPosition = parseFloat(d3.select(this).attr("y"));

  		svg.append("text")
  			.attr("id", "tooltip")
  			.attr("x", xPosition)
  			.attr("y", yPosition)
  			.attr("text-anchor", "middle")
  			.attr("font-family", "sans-serif")
  			.attr("font-size", "11px")
  			.attr("font-weight", "bold")
  			.attr("fill", "black")
  			.text(d);
  	})
  	.on("mouseout", function(d){
  		d3.select("#tooltip").remove();
  		d3.select(this).attr("fill", function(d){
  			return "rgb(0, 0, " + Math.round(d * 10) + ")";
  		})
  	});

svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(0," + (height - padding) + ")")
   .call(xAxis);


svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(" + padding + ",0)")
   .call(yAxis);

d3.select("#add").on("click", function() {

        const maxValue = 25;

        var newNumber = Math.floor(Math.random() * maxValue);
        var bars = svg.selectAll("rect").data(dataset);
        
		dataset.push(newNumber);
		xScale.domain(d3.range(dataset.length));
        yScale.domain([0, d3.max(dataset)]);


        bars.enter()								
        	.append("rect")							
        	.attr("x", "width")							
        	.attr("y", function(d) {				
        		return height - yScale(d) - padding;
            })
        	.attr("width", xScale.bandwidth())		
        	.attr("height", function(d) {			
        		return yScale(d);
        	})
        	.attr("fill", function(d) {				
        		return "rgb(0, 0, " + Math.round(d * 10) + ")";
        	})
        	.on("mouseover", function(d){
          		d3.select(this).attr("fill", "orange");
          			
          		var xPosition = parseFloat(d3.select(this).attr("x"));
          		var yPosition = parseFloat(d3.select(this).attr("y"));

          		svg.append("text")
          			.attr("id", "tooltip")
          			.attr("x", xPosition)
          			.attr("y", yPosition)
          			.attr("text-anchor", "middle")
          			.attr("font-family", "sans-serif")
          			.attr("font-size", "11px")
          			.attr("font-weight", "bold")
          			.attr("fill", "black")
          			.text(d);
          	})
	        .on("mouseout", function(d){
            	d3.select("#tooltip").remove();
            	d3.select(this).attr("fill", function(d){
            		return "rgb(0, 0, " + Math.round(d * 10) + ")";
            	})
            })
  		    .merge(bars)							
  		    .transition()							
  		    .duration(1000)
  		    .attr("x", function(d, i) {				
  			        return xScale(i);
  		    })
  		    .attr("y", function(d) {				
  			        return height - yScale(d) - padding;
  		    })
  		    .attr("width", xScale.bandwidth())		
  		    .attr("height", function(d) {			
  			       return yScale(d);
		    });
});

d3.select("#remove").on("click", function() { 

        dataset.shift();

		xScale.domain(d3.range(dataset.length));
        yScale.domain([0, d3.max(dataset)]);

        var bars = svg.selectAll("rect")
	                     .data(dataset);

        bars.exit()								
        .transition()
        .duration(500)
        .attr("x", -xScale.bandwidth())
        .remove();
});

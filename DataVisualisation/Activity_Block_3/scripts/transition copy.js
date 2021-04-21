var width = 600;
    height = 250;
    padding = 30;
			
var dataset = [ 12, 24, 14, 7, 8, 15, 21, 19, 3, 8, 6, 20, 18, 15, 9, 5, 10];
			
			
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
	});

svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);
        
svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);
              


d3.select("#update").on("click", function() {

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
           });
        }
);

d3.select("#transition1").on("click", function() { // for ease circle in

        const maxValue = 25;
        //New values for dataset
        var numValues = dataset.length;
             						//Count original length of dataset
        dataset = [];  						 				//Initialize empty array
        for (var i = 0; i < numValues; i++) {				//Loop numValues times
                var newNumber = Math.floor(Math.random() * maxValue); //New random integer (0-24)
                dataset.push(newNumber);			 			//Add new number to array
        }

        yScale.domain([0, d3.max(dataset)]);

        //Update all rects
        svg.selectAll("rect")
           .data(dataset)
           .transition()
           .delay(function(d,i){
                return i * 100;
           })
           .duration(2000)
           .ease(d3.easeCircleIn)
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
           });
        }
);


d3.select("#transition2").on("click", function() {    // for ease elastic out

        const maxValue = 25;
        //New values for dataset
        var numValues = dataset.length;
             						//Count original length of dataset
        dataset = [];  						 				//Initialize empty array
        for (var i = 0; i < numValues; i++) {				//Loop numValues times
             var newNumber = Math.floor(Math.random() * maxValue); //New random integer (0-24)
             dataset.push(newNumber);			 			//Add new number to array
        }

        yScale.domain([0, d3.max(dataset)]);

        //Update all rects
        svg.selectAll("rect")
           .data(dataset)
           .transition()
           .delay(function(d,i){
                   return i /numValues * 1000;
           })
           .duration(2000)
           .ease(d3.easeElasticOut)
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
           });
        }
);



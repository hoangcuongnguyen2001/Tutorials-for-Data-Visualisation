var width = 700;
var height = 300;
var padding = 30;
var distance = 5;
var radius = 3;


// loading the dataset.
var dataset = [
                [35, 60], [610, 90], [250, 50], [100, 35], [330, 95],
                [410, 140], [475, 44], [5, 67], [85, 51], [220, 88]
              ];


// Create scale for x-axis
var xScale = d3.scaleLinear()
               .domain([0,
               d3.max(dataset,function(d){ return d[0];})])
               .range([padding, width - padding * 2]);


// Create scale for y-axis
var yScale = d3.scaleLinear()
               .domain([0,
               d3.max(dataset,function(d){return d[1];})])
               .range([height - padding, padding]);


// Create x- and y-axis.
var xAxis = d3.axisBottom().scale(xScale).ticks(5);
var yAxis = d3.axisLeft().scale(yScale).ticks(5);



 //Create SVG element
var svg = d3.select("body")
.append("svg")
.attr("width", width)
.attr("height", height);

// Create circles
svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
           return xScale(d[0]);
   })
   .attr("cy", function(d) {
           return yScale(d[1]);
   })
   .attr("r", radius)
   .attr("fill", "green");

//Create text for each circle
svg.selectAll("text")
.data(dataset)
.enter()
.append("text")
.text(function(d){
    return d[0] + "," + d[1];
})
.attr("x", function(d) {
           return xScale(d[0]) + distance;
})
.attr("y", function(d) {
           return yScale(d[1]);
})
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "red");
  

//Create X axis
svg.append("g")
.attr("class", "axis")
.attr("transform", "translate(0," + (height - padding) + ")")
.call(xAxis);

//Create Y axis
svg.append("g")
.attr("class", "axis")
.attr("transform", "translate(" + padding + ",0)")
.call(yAxis);


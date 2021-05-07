var width = 700;
var height = 300;
var padding = 20;
var distance = 5;
var radius = 5;


// loading the dataset.
var dataset = [
                [5, 20], [610, 90], [250, 50], [100, 33], [330, 95],
                [410, 140], [475, 44], [25, 67], [85, 21], [220, 88]
              ];





// Create scale for x-axis
var xScale = d3.scaleLinear()
               .domain([d3.min(dataset, function(d){
                   return d[0];
               }),
               d3.max(dataset,function(d){
                   return d[0];
               })])
               .range([padding, width - padding * 2]);


// Create scale for y-axis
var yScale = d3.scaleLinear()
               .domain([d3.min(dataset, function(d){
                   return d[1];
               }),
               d3.max(dataset,function(d){
                   return d[1];
               })])
               .range([height - padding, padding]);

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
  
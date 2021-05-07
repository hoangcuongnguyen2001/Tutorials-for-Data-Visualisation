let width = 300;
    height = 300;

let dataset = [{apples: 5, oranges : 10, grapes: 22},
               {apples: 15, oranges : 9, grapes: 12},
               {apples: 18, oranges : 7, grapes: 24},
               {apples: 9, oranges : 20, grapes: 15},    
               {apples: 20, oranges : 12, grapes: 8}];

let stack = d3.stack().keys(["apples", "oranges", "grapes"]) .order(d3.stackOrderDescending); 
let series = stack(dataset);

 //Create SVG element
let svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

let colors = d3.scaleOrdinal(d3.schemeCategory10);


var xScale = d3.scaleBand()
               .domain(d3.range(dataset.length))
               .range([0, width])
               .paddingInner(0.05);


var yScale = d3.scaleLinear()
               .domain([0,				
                   d3.max(dataset, function(d) {
                       return d.apples + d.oranges + d.grapes;
                   })
               ])
               .range([height, 0]);


   // Add a group for each row of data
var groups = svg.selectAll("g")
       .data(series)
       .enter()
       .append("g")
       .style("fill", function(d, i) {
           return colors(i);
       });

   // Add a rect for each data value
groups.selectAll("rect")
       .data(function(d) { return d; })
       .enter()
       .append("rect")
       .attr("x", function(d, i) {
           return xScale(i);
       })
       .attr("y", function(d) {
           return yScale(d[1]);
       })
       .attr("height", function(d) {
           return yScale(d[0]) - yScale(d[1]);
       })
       .attr("width", xScale.bandwidth());
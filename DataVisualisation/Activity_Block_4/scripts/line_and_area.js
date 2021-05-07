var width = 750;
var height = 400;
var padding = 80;


var dataset, xScale, yScale, xAxis, yAxis, area;


function lineChart(){

var xScale = d3.scaleTime()
               .domain([d3.min(dataset, function(d){
                   return d.date;
               }),
                       d3.max(dataset,function(d){
                   return d.date;
               })])
               .range([padding, width]);

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d){
                      return d.number;
               })])
               .range([height - padding, 0]);




var xAxis = d3.axisBottom()
             .scale(xScale)
             .ticks(10);

  //Define Y axis
var yAxis = d3.axisLeft()
             .scale(yScale)
             .ticks(10);


var svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

var area = d3.area()
             .x(function(d) { return xScale(d.date); })
             .y0(function() { return yScale.range()[0]; })
             .y1(function(d) { return yScale(d.number); });


svg.append("path")
   .datum(dataset)
   .attr("class", "area")
   .attr("d", area);


svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(0," + (height - padding) + ")")
   .call(xAxis);

svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(" + padding + ",0)")
   .call(yAxis);



//Draw 350 ppm line
svg.append("line")
   .attr("class", "line halfMillionMarks")
   .attr("x1", padding)
   .attr("x2", width)
   .attr("y1", yScale(500000))
   .attr("y2", yScale(500000));

svg.append("text")
   .attr("class", "halfMilLabel")
   .attr("x", padding + 20)
   .attr("y", yScale(500000) - 7)
   .text("Half a million unemployed");
}

// Initialization the process when the file is loaded.
function init(){


    d3.csv("files/Unemployment_78-95.csv", function(d){
       return{
           date: new Date(+d.year, +d.month - 1),
           number: +d.number
       };
    })
        .then(function(data){
           dataset = data;
           lineChart(dataset);
    });
}

window.onload = init;
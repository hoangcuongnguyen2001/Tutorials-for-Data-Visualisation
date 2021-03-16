var width = 500;
var height = 100;
var magnify_times = 4;
var barPadding = 2;

var dataset;

function barChart(){
//Create SVG element
var svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
           return i * (width / dataset.length);
   })
   .attr("y", function(d) {
           return height - (d.Test * magnify_times);
   })
   .attr("width", width / dataset.length - barPadding)
   .attr("height", function(d) {
           return d.Test * magnify_times;
   })
   .attr("fill", function(d){
         return "rgb(100, 100, " + Math.round(d.Test * 10) + ")";
   });
}

// Initialization the process when the file is loaded.
function init(){
    d3.csv("Task_1.7.csv").catch(function(error){
        if(error){
           document.getElementById("chart").innerHTML = "There is an error while loading data.";
         console.log(error);
        }
    })
        .then(function(data){
        dataset = data;
        barChart(dataset);
    });
}

window.onload = init;
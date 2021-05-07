let width = 450;
    height = 450;

let dataset = [21, 8, 17, 35, 32, 45, 6, 9];

let outerRadius = width /2;
    innerRadius = 0;

let arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

let pie = d3.pie();

let colour = d3.scaleOrdinal(d3.schemeCategory10);

let svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);
			
//Set up groups
let arcs = svg.selectAll("g.arc")
			  .data(pie(dataset))
			  .enter()
			  .append("g")
			  .attr("class", "arc")
			  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

//Draw arc paths
arcs.append("path")
    .attr("fill", function(d, i) {
       return colour(i);
    })
    .attr("d", arc);

//Labels
arcs.append("text")
    .attr("transform", function(d) {
       return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
       return d.value;
    });
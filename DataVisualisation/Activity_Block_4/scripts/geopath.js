var width = 500;
    height = 300;

var projection = d3.geoMercator().center([145, -36.5])
                   .translate([width/2, height/2])
                   .scale(2450);

var path = d3.geoPath().projection(projection);

var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
            .attr("fill", "grey");


d3.json("files/LGA_VIC.json").then(function(json){

    svg.selectAll(path)
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path);
});


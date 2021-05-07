var width = 500;
var height = 300;

var projection = d3.geoMercator().center([145, -36.5])
                   .translate([width/2, height/2])
                   .scale(2450);

var color = d3.scaleQuantize().range(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#2ca25f','#006d2c']);


var path = d3.geoPath().projection(projection);

var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
            .attr("fill", "grey");

d3.csv("files/VIC_LGA_unemployment.csv").then(function(data) {

	//Set input domain for color scale
	color.domain([
		d3.min(data, function(d) { return d.unemployed; }), 
		d3.max(data, function(d) { return d.unemployed; })
	]);

    d3.json("files/LGA_VIC.json").then(function(json) {

        for (var i = 0; i < data.length; i++) {
    
            
            var data_LGA = data[i].LGA;
            
            //Grab data value, and convert from string to float
            var dataValue = parseFloat(data[i].unemployed);
    
       
            for (var j = 0; j < json.features.length; j++) {
            
                var json_LGA = json.features[j].properties.LGA_name;
    
                if (data_LGA == json_LGA) {
            
                    //Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;
                    
                    //Stop looking through the JSON
                    break;
                    
                }
            }		
        }

        svg.selectAll("path")
			.data(json.features)
		    .enter()
			.append("path")
			.attr("d", path)
			.style("fill", function(d) {
			//Get data value
				var value = d.properties.value;
					   		
				if (value) {
					//If value exists…
					return color(value);
				} else {
					//If value is undefined…
					return "#ccc";
				}
			});

			d3.csv("files/VIC_city.csv").then(function(data) {
						
				svg.selectAll("circle")
				   .data(data)
				   .enter()
				   .append("circle")
				   .attr("cx", function(d) {
					   return projection([d.lon, d.lat])[0];
				   })
				   .attr("cy", function(d) {
					   return projection([d.lon, d.lat])[1];
				   })
				   .attr("r", 5)
				   .style("fill", "yellow")
				   .style("stroke", "gray")
				   .style("stroke-width", 0.25)
				   .style("opacity", 0.75)
				   .append("title")	
				   .text(function(d) {
					return d.place ;
			       });
				   
				   
			
	});
			
});
})

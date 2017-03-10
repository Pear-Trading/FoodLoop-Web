app.controller('mapCtrl',function($scope,$http,uploadReceiptService) {


  // data 
  var traderGeoData = [
    { Latitude:54.04,Longitude:2.80,trader:"sample_1" },
    { Latitude:54.04,Longitude:2.80,trader:"sample_2" },
    { Latitude:54.01,Longitude:2.78,trader:"sample_3" },
  ];
  
  var map = L.map('map').setView([54.0472, -2.8018], 13);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);

var svgLayer = L.svg();
svgLayer.addTo(map);

var svg = d3.select("#map").select("svg");
var g = d3.select("#map").select("svg").select('g');
g.attr("class", "leaflet-zoom-hide");


	/* We simply pick up the SVG from the map object */
	var svg = d3.select("#map").select("svg"),
	g = svg.append("g");
	
	d3.json("../pages/map/circles.json", function(collection) {
		/* Add a LatLng object to each item in the dataset */
		collection.objects.forEach(function(d) {
			d.LatLng = new L.LatLng(d.circle.coordinates[0],
									d.circle.coordinates[1])
		})
		
		var feature = g.selectAll("circle")
			.data(collection.objects)
			.enter().append("circle")
			.style("stroke", "black")  
			.style("opacity", .6) 
			.style("fill", "red")
			.attr("r", 20);  
		
		map.on("viewreset", update);
		update();

		function update() {
      console.log("update!");
			feature.attr("transform", 
			function(d) { 
				return "translate("+ 
					map.latLngToLayerPoint(d.LatLng).x +","+ 
					map.latLngToLayerPoint(d.LatLng).y +")";
				}
			)
		}
	})			 
})  
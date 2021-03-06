var map;
var myLatLng;

$(document).ready(function(){

geoLocationInit();
function geoLocationInit(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(success, fail);
	}else{
		alert("Browser not supporting");
	}
}

function success(position){
	//console.log(position);
	var latval = position.coords.latitude;
	var lngval = position.coords.longitude;

	console.log(latval, lngval);

	myLatLng = new google.maps.LatLng(latval, lngval);
	createMap(myLatLng);
	//nearbySearch(myLatLng, "school");
	pretragaTacaka(latval, lngval);
}

function fail(){
	alert("It fails");
}


function createMap(myLatLng){

	map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          //scrollwheel: false,
          zoom: 12
        });

	var marker = new google.maps.Marker({
		position: myLatLng,
	    map: map
	});
}
	
function createMarker(latlng, icn, name){

	var marker = new google.maps.Marker({
	    position: latlng,
	    map: map,
	    icon: icn,
	    title: name
	  });

}

function nearbySearch(myLatLng, type){
	var request = {
		    location: myLatLng,
		    radius: '5000',
		    types: [type]
		  };


		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, callback);

		function callback(results, status) {

		  //console.log(results);
		  if (status == google.maps.places.PlacesServiceStatus.OK) {
		    for (var i = 0; i < results.length; i++) {

		      var place = results[i];

		      var latlng = place.geometry.location;
		      var icn = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
		      var name = place.name;

		      createMarker(latlng, icn, name);
		    }
		}
	}
}
//44.801085699999994
//20.5218547

function pretragaTacaka(sirina, duzina){
	$.post('http://localhost:8000/api/pretraga', {lat:sirina, lng:duzina}, function(match){
	//console.log(match);

		$.each(match, function(i,val){
			var tackaLat = val.sirina;
			var tackaLng = val.duzina;
			var tackaName = val.name;

			var tLatLng = new google.maps.LatLng(tackaLat, tackaLng);
			var tIcn = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

			createMarker(tLatLng, tIcn, tackaName);
		})
	});
}

	

});
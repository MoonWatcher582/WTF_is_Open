function initialize(option, distance) {
	var user_location = new google.maps.LatLng(lat.value, _long.value);

	var map_options = {
		center: user_location,
		zoom: 12
	};
	map = new google.maps.Map(document.getElementById('map'), map_options);
	
	var request;
	if(option == 'p') {
		request = {
			location: user_location,
			radius: distance,
			openNow: 'true',
			rankBy: google.maps.places.RankBy.PROMINENCE,
			types: list_of_types	
		};
	} else if(option == 'd') {
		request = {
			location: user_location,
			openNow: 'true',
			rankBy: google.maps.places.RankBy.DISTANCE,
			types: list_of_types
		};
	} else {
		alert("How the fuck did you crash this code you twat?");
		return;
	}

	infowindow = new google.maps.InfoWindow();	
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
}

function callback(results, status, pagination) {
	var result = document.getElementById('result');
	var p_start = "<p id='error'>";
	var p_end = "</p>";
	if(status == google.maps.places.PlacesServiceStatus.ERROR) {
		result.innerHTML = p_start + "There was a goddamn problem contacting those google fuckers." + p_end;
		return;
	} else if(status == google.maps.places.PlacesServiceStatus.INVALID_REQUEST) {
		result.innerHTML = p_start + "The motherfucking request was invalid. Fix yo damn code." + p_end;
		return;
	} else if(status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
		result.innerHTML = p_start + "You're over your query limit" + p_end;
		return;
	} else if(status == google.maps.places.PlacesServiceStatus.REQUEST_DENIED) {
		result.innerHTML = p_start + "This website was banned from using places. Sucks." + p_end;
		return;
	} else if(status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
		result.innerHTML = p_start + "Somehow, literally nothing is open around you." + p_end;
		return;
	} else if(status == google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR) {
		result.innerHTML = p_start + "We don't even fucking know what you did." + p_end;
		return;
	} else if(status == google.maps.places.PlacesServiceStatus.OK) {
		result.innerHTML = "<p id='listStart'>" + "Here's what the fuck is open" + "</p>";
		buildList(results);
	}
}

function buildList(results) {
	for(var i = 0; i < results.length; i++) {
		createMarker(results[i]);
		var request = {
			placeId: results[i].place_id
		};
		service.getDetails(request, addToDiv);
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}

function addToDiv(place, status) {
	if(status !== google.maps.places.PlacesServiceStatus.OK) {
		return;
	}

	var photo;
	if(place.photos) {
		photo = "<img class='elemPhoto' src=" + place.photos[0].getUrl({'maxWidth':100, 'maxHeight':100}) + ">";
	} else {
		photo = "";
	}

	var newElement = document.createElement('div');
	var name = "<p class='elemName'>" + place.name + "</p>";
	var phone = "<p class='elemPhone'>" + place.formatted_phone_number + "</p>";
	var vicinity = "<p class='elemvicinity'>" + place.vicinity + "</p>";
	var website;
	if(place.website) {	
		website  = "<a class='elemWebsite' href='" + place.website + "'>" + "Website" + "</a>";
	} else if(place.url) {
		website  = "<a class='elemWebsite' href='" + place.url + "'>" + "Website" + "</a>";
	} else {
		website = "";
	}
	newElement.innerHTML = photo + name + phone + vicinity + website + "<br />";

	open.appendChild(newElement);
}

google.maps.event.addDomListener(window, 'load', initialize);

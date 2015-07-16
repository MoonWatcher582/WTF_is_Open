function displayPosition(position) {
	//alert("Lat: " + position.coords.latitude + ", Long: " + position.coords.longitude);
	lat.setAttribute('value', position.coords.latitude);
	_long.setAttribute('value', position.coords.longitude);
}

function displayError(error) {
	//disable website
	document.getElementById('button').disabled = true;
	document.getElementById('menu').disabled = true;

	//display error on page
	var post = document.getElementById('result');
	var toPost = "";

	//handle error
	switch(error.code) {
		case error.PERMISSION_DENIED:
			toPost = "Hey asshole, you denied the geolocation request. What the fuck do you expect us to do now?";
			break;
		case error.POSITION_UNAVAILABLE:
			toPost = "Your position isn't even fucking available!";
			break;
		case error.TIMEOUT:
			toPost = "The fucking request timed out!";
			break;
		case error.UNKNOWN_ERROR:
		default:
			toPost = "An unknown error occurred. What the fuck did you do?";
	}
	post.innerHTML = "<p id='error'>" + toPost + "</p>";
}

function getLocation() {
	if(navigator.geolocation) {
		var geo_options = { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 };	
		navigator.geolocation.getCurrentPosition(displayPosition, displayError, geo_options);
	} else {
		alert("Your fucking browser doesn't support geolocation, you fucking old man.");
	}
}

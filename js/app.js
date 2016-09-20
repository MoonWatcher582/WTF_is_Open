//GEOLOCATION
function displayPosition(position){
	//alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
	var lat = document.getElementById('lat');
	lat.setAttribute('value', position.coords.latitude);
	var _long = document.getElementById('long');
	_long.setAttribute('value', position.coords.longitude);
}

function displayError(){
	alert("Sorry, no position available.");
}

var geo_options = {
	enaleHighAccuracy	: true,
	maximumAge		: 30000,
	timeout			: 27000
}

if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(displayPosition, displayError, geo_options);
}else{
	alert("Sorry, geolocation is not supported by your browser.");
}

//DISTANCE BOX
function handler(select) {
	var selInd = select.selectedIndex;
	var selOpt = select.options[selInd];

	if(selInd == 1){
		//alert("The selected option is " + selOpt.value);
		var toAdd = document.getElementById('dynamicAdding');

		var text = document.getElementById('text');
		text.innerText = text.textContent = "Please enter the distance you'd like to check in miles: ";

		var radius_entry = document.createElement('input');
		radius_entry.setAttribute('type', 'text');
		radius_entry.setAttribute('value', '0');
		radius_entry.setAttribute('id', 'radius');
		radius_entry.setAttribute('name', 'radius');
		toAdd.appendChild(radius_entry);
	}else{
		//alert("The selected option is " + selOpt.value);
		var text = document.getElementById('text');
		text.innerText = text.textContent = "";

		var toRemove = document.getElementById('radius');
		toRemove.parentNode.removeChild(toRemove);
	}
}

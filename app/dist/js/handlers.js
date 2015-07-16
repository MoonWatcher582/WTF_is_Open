function boxHandler(select) {
	var selectIndex = select.selectedIndex;
	var text = document.getElementById('text');
	
	if(selectIndex == 1) {
		var addToParent = document.getElementById('distancebox');
		var radiusEntry = document.createElement('input');

		text.innerText = text.textContent = "Please enter the distance you'd like to check in miles:";
		
		radiusEntry.setAttribute('type', 'number');
		radiusEntry.setAttribute('value', '0');
		radiusEntry.setAttribute('id', 'radius');
		radiusEntry.setAttribute('name', 'radius');

		addToParent.appendChild(radiusEntry);		
	} else {
		var removeFromParent = document.getElementById('radius');
		
		text.innerText = text.textContent = "";	
		removeFromParent.parentNode.removeChild(removeFromParent);
	}
}

function dataValidation() {
	var distance;
	var result = document.getElementById('result');
	var option = document.getElementById('menu').selectedIndex;
	open.innerHTML = "";
	if(option == '0') {
		result.innerHTML = "<p id='error'> Does that look like a goddamn valid answer? </p>";
		return false;
	} else if (option == '1') {
		distance = document.getElementById('radius').value;
		distance = Number(distance);
		if(isNaN(distance) || distance < 1) {
			//sort by prominence has errors
			result.innerHTML = "<p id='error'> Does that look like a goddamn valid answer? </p>";
			document.getElementById('distance').value = "";
			return false;
		}
		result.innerHTML = "";
		distance *= 1609.344; //convert miles to meters
		distance = distance.toString();
		//alert("Distance: " + distance + "\nLat+Long: " + lat.value + " " + _long.value);
		initialize('p', distance);
	} else {
		result.innerHTML = "";
		initialize('d', -1);
	}
}

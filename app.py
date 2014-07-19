from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def home():
	return render_template('index.html')

@app.route('/isOpen')
def isOpen():
	key = 'AIzaSyBj6dkQWl1z-Oa2tr2iaix9Gcul3SuQbqE'
	
	#locations (lat,long), use HTML5 geolocation
		#for now, 40.4867N, 74.4444W
	location = '40.486678,-74.444414'
	
	#radius= USER miles (convert to meters)
	radius = '2000'
	
	#rankby= USER (checkbox or something)
		#distance, prominence
	
	#types = 'bakery|bar|cafe|convenience_store|food|liquor_store|meal_delivery|meal_takeaway|retaurant|shopping_mall'
	types = 'food'
	#opennow=true

	payload = {'key': key, 'location': location, 'radius': radius, 'opennow': 'true', 'rankby': 'prominence', 'types': types}

	r = requests.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", params=payload)
	print(r.url)
	
	places = r.json()["results"]

	return render_template('isOpen.html', url=r.url, places=places)

if __name__ == '__main__':
	app.run('0.0.0.0', port=4000, debug=True)

#center with CSS
#replace icons with photos
#do other CSS shit
#set up user options
#get user location
#set up maps onClick

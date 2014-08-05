from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def home():
	return render_template('index.html')

@app.route('/isOpen')
def isOpen():
	key = 'AIzaSyBj6dkQWl1z-Oa2tr2iaix9Gcul3SuQbqE'
	location = '40.486678,-74.444414'
	types = 'bakery|bar|cafe|convenience_store|food|liquor_store|meal_delivery|meal_takeaway|retaurant|shopping_mall'
	#types = 'food'

	if request.args['option1'] == "prominence":
		radius = request.args['radius']
		payload = {'key': key, 'location': location, 'radius': radius, 'opennow': 'true', 'rankby': 'prominence', 'types': types}
	
	elif request.args['option1'] == "distance":
		payload = {'key': key, 'location': location, 'opennow': 'true', 'rankby': 'distance', 'types': types}

	r = requests.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", params=payload)
	print(r.url)
	
	places = r.json()["results"]

	return render_template('isOpen.html', url=r.url, places=places)

if __name__ == '__main__':
	app.run('0.0.0.0', port=4000, debug=True)

#Notes to self on API args:
#key is Google API auth. key
#location will be determined using HTML5 geolocation; for now, wikipedia's coordinates for New Brunswick (40.4867N, 74.4444W) will be used
#radius will be input via text bar by the user in miles, and converted to meters because that's what the API wants
#opennow will always be true because that's the point of the fucking app
#rankby will be selected via dropbar by the user; prominence sort requires radius, distance requires that there is NO radius
#types are, for now, hardcoded for food/alcohol options; may include a user selection later but that might end up being overly complicated for this app

#To Do:
#center with CSS
#do other CSS shit
#replace icons with photos
#get user location
#set up maps onClick
#include alerts if the store closes within 30min

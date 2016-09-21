package main

import (
	//	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
)

const (
	HOME        = "src/templates/index.html"
	OPEN        = "src/templates/isOpen.html"
	NO_LOCATION = "src/templates/noLocation.html"
	PORT        = ":8080"
)

type Message struct {
	Title string
	Text  string
}

var client *http.Client

func renderTemplate(w http.ResponseWriter, r *http.Request, msg *Message, path string) {
	t, err := template.ParseFiles(path)
	if err != nil {
		http.NotFound(w, r)
	}
	err = t.Execute(w, msg)
	if err != nil {
		fmt.Println("Error writing to response writer\n\b", err)
	}
	return
}

// handler for loading static asset requests
func AssetsHandler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	if strings.Contains(path, "/static") {
		style, err := ioutil.ReadFile("src/static/style.css")
		if err != nil {
			fmt.Println("Error handling styles,", err)
		}
		w.Header().Set("Content-Type", "text/css; charset=utf-8")
		w.Write(style)
	} else if strings.Contains(path, "/js") {
		js, err := ioutil.ReadFile("src/js/app.js")
		if err != nil {
			fmt.Println("Error handling JS,", err)
		}
		w.Header().Set("Content=Type", "application/javascript; charset=utf-8")
		w.Write(js)
	} else {
		fmt.Println("No assets to handle. Aborting...")
	}
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, r, &Message{Title: "What the Fuck is Open?", Text: "Would you like to sort by prominence or distance?"}, HOME)
	return
}

func locationHandler(w http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()
	fmt.Println(queries)

	// Key for server apps (with IP locking)
	//serverKey := "AIzaSyBj6dkQWl1z-Oa2tr2iaix9Gcul3SuQbqE"

	// "Key for browser apps (with referrers)
	//browserKey := "AIzaSyCp6JnyzRhefAtgJ7h3w0X6PgemLd7uQmk"

	//location := queries["lat"][0] + "." + queries["_long"][0]
	//types := "bakery|bar|cafe|convenience_store|food|liquor_store|meal_delivery|meal_takeaway|restaurant|shopping_mall"

	if queries["option1"][0] == "prominence" {
		radiusParam, err := strconv.ParseFloat(queries["radius"][0], 64)
		if err != nil {
			fmt.Println("Error retrieving radius", err)
		}
		radiusParam *= 1609.344
		radius := strconv.FormatFloat(radiusParam, 'E', -1, 64)
		fmt.Println(radius)
	}
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", mainHandler)
	r.HandleFunc("/static/"+`{path.:\S+.css}`, AssetsHandler)
	r.HandleFunc("/js/"+`{path.:\S+.js}`, AssetsHandler)
	r.HandleFunc("/isOpen", locationHandler)

	fmt.Println("Listening and serving on port", PORT)
	log.Fatal(http.ListenAndServe(PORT, r))
	return
}

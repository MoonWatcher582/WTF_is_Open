package main

import (
	//	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
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
		js, err := ioutil.ReadFile("src/static/style.css")
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
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(body)
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

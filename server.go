package main

import (
	//	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
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

}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, r, &Message{Title: "What the Fuck is Open?", Text: "Would you like to sort by prominence or distance?"}, HOME)
	return
}

func orderHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(body)
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/static/"+`{path.:\S+}`, AssetsHandler)
	router.HandleFunc("/", mainHandler)
	fmt.Println("Listening and serving on port", PORT)
	log.Fatal(http.ListenAndServe(PORT, router))
	return
}

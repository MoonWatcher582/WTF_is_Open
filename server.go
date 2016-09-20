package main

import (
	//	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"mime"
	"net/http"
)

const (
	HOME        = "templates/index.html"
	OPEN        = "templates/isOpen.html"
	NO_LOCATION = "templates/noLocation.html"
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
	// problem is here
	err = t.Execute(w, msg)
	if err != nil {
		fmt.Println("Error writing to response writer\n\b", err)
	}
	return
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
	http.HandleFunc("/", mainHandler)
	fmt.Println("Listening and serving on port", PORT)
	http.ListenAndServe(PORT, nil)
	return
}

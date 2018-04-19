package main

import (
	"compress/gzip"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/pkg/errors"
)

type Recipe struct {
	Name          string
	Description   string
	TotalTime     time.Duration
	Directions    []string
	Ingredients   []Ingredient
	Servings      int
	Images        []string
	Author        string
	LastEdited    time.Time
	DatePublished time.Time
}

type Ingredient struct {
	Name        string
	Measurement string
	Amount      int
	Images      []string
}

func newRecipe(w http.ResponseWriter, r *http.Request) {
	var R Recipe
	if err := readJSON(r, &R); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
	fmt.Println("got recipe: R", R)
	w.WriteHeader(http.StatusOK)
}

func getRecipe(w http.ResponseWriter, r *http.Request) {
	R := Recipe{Name: "", Directions: []string{}, Ingredients: []string{}}
	if err := writeJSON(w, R); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello")
}

func main() {
	http.HandleFunc("/", hello)
	http.HandleFunc("/get", getRecipe)
	http.HandleFunc("/new", newRecipe)
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func writeJSON(w http.ResponseWriter, v interface{}) error {
	w.Header().Set("content-type", "application/json;charset=utf-8")
	w.Header().Set("content-encoding", "gzip")
	W, err := gzip.NewWriterLevel(w, 1)
	if err != nil {
		return err
	}
	defer W.Close() // TODO handle error
	encoder := json.NewEncoder(W)
	encoder.SetIndent("", "  ")
	return errors.Wrap(encoder.Encode(v), "json")
}

func readJSON(r *http.Request, v interface{}) error {
	return errors.Wrap(json.NewDecoder(r.Body).Decode(v), "json")
}

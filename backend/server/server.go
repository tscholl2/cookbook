package main

import (
	"compress/gzip"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/pkg/errors"
)

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello")
}

func main() {
	http.HandleFunc("/", hello)
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
	defer W.Close()
	encoder := json.NewEncoder(W)
	encoder.SetIndent("", "  ")
	return errors.Wrap(encoder.Encode(v), "json")
}

func readJSON(r *http.Request, v interface{}) error {
	return errors.Wrap(json.NewDecoder(r.Body).Decode(v), "json")
}

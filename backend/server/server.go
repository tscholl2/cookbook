package main

import (
	"compress/gzip"
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/pkg/errors"
	"github.com/shurcooL/httpgzip"
)

//go:generate esc -o static.go -pkg main -private -prefix static static

func main() {
	webHandler := httpgzip.FileServer(_escFS(false), httpgzip.FileServerOptions{IndexHTML: true})
	apiHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, map[string]interface{}{"hello": "world"})
	})
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/api") {
			apiHandler.ServeHTTP(w, r)
			return
		}
		webHandler.ServeHTTP(w, r)
		return
	})
	log.Fatal(http.ListenAndServe(":8080", nil))
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

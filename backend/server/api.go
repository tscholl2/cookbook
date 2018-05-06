package server

import (
	"net/http"
	"time"
)

var (
	startTime = time.Now()
)

func status() http.HandlerFunc {
	return errorHandler(func(w http.ResponseWriter, r *http.Request) error {
		return writeJSON(w, map[string]interface{}{"uptime": time.Since(startTime).String()})
	})
}

// TODO: all recipes

// TODO: new recipe

// TODO: edit recipe

func newAPIHandler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/status", status())
	return mux
}

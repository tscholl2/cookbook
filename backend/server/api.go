package server

import (
	"net/http"
	"time"

	"github.com/tscholl2/cookbook/backend/app"
)

var (
	startTime = time.Now()
	version   string // set by ldflag in build command
)

func status() http.HandlerFunc {
	return errorHandler(func(w http.ResponseWriter, r *http.Request) error {
		return writeJSON(w, map[string]interface{}{"uptime": time.Since(startTime).String(), "version": version})
	})
}

func add(a app.App) http.HandlerFunc {
	return errorHandler(func(w http.ResponseWriter, r *http.Request) error {
		var R app.Recipe
		if err := readJSON(r, &R); err != nil {
			return err
		}
		R, err := a.NewRecipe(R)
		if err != nil {
			return err
		}
		return writeJSON(w, R)
	})
}

func edit(a app.App) http.HandlerFunc {
	return errorHandler(func(w http.ResponseWriter, r *http.Request) error {
		var R app.Recipe
		if err := readJSON(r, &R); err != nil {
			return err
		}
		R, err := a.EditRecipe(R)
		if err != nil {
			return err
		}
		return writeJSON(w, R)
	})
}

func all(a app.App) http.HandlerFunc {
	return errorHandler(func(w http.ResponseWriter, r *http.Request) error {
		return writeJSON(w, a.AllRecipes())
	})
}
func newAPIHandler(a app.App) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/status", status())
	mux.HandleFunc("/new", add(a))
	mux.HandleFunc("/edit", edit(a))
	mux.HandleFunc("/all", all(a))
	return mux
}

package server

import (
	"net/http"
	"time"

	"github.com/tscholl2/cookbook/backend/app"
)

var (
	startTime = time.Now()
)

func status(version string) http.HandlerFunc {
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
			return codeErr(http.StatusBadRequest)
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
		all, err := a.AllRecipes()
		if err != nil {
			return err
		}
		return writeJSON(w, all)
	})
}
func newAPIHandler(options Options) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/status", status(options.Version))
	mux.HandleFunc("/new", add(options.App))
	mux.HandleFunc("/edit", edit(options.App))
	mux.HandleFunc("/all", all(options.App))
	return mux
}

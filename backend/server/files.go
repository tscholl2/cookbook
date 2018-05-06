package server

import (
	"net/http"

	"github.com/shurcooL/httpgzip"
)

// go get -u -v github.com/mjibson/esc
//go:generate esc -o static.go -pkg server -private -prefix static static

func newWebHandler() http.Handler {
	return httpgzip.FileServer(_escFS(false), httpgzip.FileServerOptions{IndexHTML: true})
}

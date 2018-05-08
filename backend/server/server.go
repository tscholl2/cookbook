package server

import (
	"context"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/tscholl2/cookbook/backend/app"
)

// Server maps HTTP endpoints to app methods.
type Server struct {
	server  http.Server
	options Options
}

// Options is the configurable properties of a Server.
type Options struct {
	App     app.App
	Port    string
	Version string
}

// New creates a new server with the given options.
func New(options Options) (s Server) {
	s.options = options
	webHandler := newWebHandler()
	apiHandler := newAPIHandler(options)
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/api") {
			r.URL.Path = r.URL.Path[4:]
			apiHandler.ServeHTTP(w, r)
			return
		}
		webHandler.ServeHTTP(w, r)
		return
	})
	s.server = http.Server{
		Addr: ":" + s.options.Port,
		Handler: applyMiddlewares(
			handler,
			loggingMiddleware(log.New(os.Stdout, "", 0), log.New(os.Stderr, "", 0)),
			requestIDMiddleware(),
		),
	}
	return
}

// Start starts the server listening on the port supplied in the options.
func (s *Server) Start() {
	log.Println("server started ", s.options.Port)
	go func() {
		if err := s.server.ListenAndServe(); err != nil {
			log.Fatalln(err)
		}
	}()
}

// Stop gracefully shutsdown the http server.
func (s *Server) Stop() {
	s.server.Shutdown(context.TODO())
	log.Println("server stopped")
}

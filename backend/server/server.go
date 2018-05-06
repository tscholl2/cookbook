package server

import (
	"context"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/tscholl2/cookbook/backend/app"
)

type Server struct {
	server http.Server
	port   string
	app    app.App
}

func New(port string, app app.App) (s Server) {
	s.port = port
	webHandler := newWebHandler()
	apiHandler := newAPIHandler(app)
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
		Addr: ":" + s.port,
		Handler: applyMiddlewares(
			handler,
			loggingMiddleware(log.New(os.Stdout, "", 0), log.New(os.Stderr, "", 0)),
			requestIDMiddleware(),
		),
	}
	return
}

func (s Server) Start() {
	log.Println("server started ", s.port)
	go func() {
		if err := s.server.ListenAndServe(); err != nil {
			log.Fatalln(err)
		}
	}()
}

func (s Server) Stop() {
	s.server.Shutdown(context.TODO())
	log.Println("server stopped")
}

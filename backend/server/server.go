package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
)

type Server struct {
	server http.Server
	port   string
}

func New(port string) (s Server) {
	s.port = port
	webHandler := newWebHandler()
	apiHandler := newAPIHandler()
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("got request for ", r.URL.Path)
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

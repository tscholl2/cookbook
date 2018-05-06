package main

import (
	"fmt"
	"os"
	"os/signal"

	"github.com/tscholl2/cookbook/backend/app"
	"github.com/tscholl2/cookbook/backend/server"
)

func main() {
	// TODO: cmd line params, add options
	port := "8080"
	filename := "recipes.json"
	// run server
	a := app.New(filename)
	s := server.New(port, a)
	s.Start()
	sigint := make(chan os.Signal, 1)
	signal.Notify(sigint, os.Interrupt)
	<-sigint
	s.Stop()
	fmt.Println("sstopped")
}

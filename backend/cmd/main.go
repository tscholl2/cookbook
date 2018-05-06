package main

import (
	"fmt"
	"os"
	"os/signal"

	"github.com/tscholl2/cookbook/backend/server"
)

func main() {
	s := server.New("8080")
	s.Start()
	sigint := make(chan os.Signal, 1)
	signal.Notify(sigint, os.Interrupt)
	<-sigint
	s.Stop()
	fmt.Println("sstopped")
}

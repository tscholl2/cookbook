package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"

	"github.com/tscholl2/cookbook/backend/app"
	"github.com/tscholl2/cookbook/backend/server"
)

var (
	version string // set by ldflags
	commit  string // set by ldflags
	date    string // set by ldflags
)

func main() {
	flag.CommandLine.Usage = func() {
		fmt.Println(`cookbook: a self hosted personal recipe collection.

                                       ╓▄▄▄,                            ╓▄▄▄,
                                     ▓█╬╫╫╫╣█▄       ,,╓╓╓╓╓,,        ▓█╬╫╫╫╣█▄
                                    ▓▌╫╫╫╫╫╫▒█▓▀▀▀╙Γ└-        -└╙╙▀▀≡█▓▒╫╫╫╫╫╫█⌐
                                    ╙█╫╫╫╬█▀└                          ╙▀▓╫╫╫▒█
                                      ▀█▒█                               "█▒█▀
                                        ▀█▄                             ╓██Γ
                                          ╙██▌▄╓                   ,▄▄▓██└
                                            ╙█▌╬╣█╙▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█╬▒▓▀-
                                              ╙▀▓█               ▐██▀
                             ,╓▄▄▄▄▓▓▓▓▓▓▓▓▓▓▓▓▌▓█               ▐▌
                       ▄▄▓▓▓╫╣╬╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫█               ▐▌
                  ,▄▓█▒▒╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫█               ▐▌
               ╓▓█╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
             ▄█╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫▓▓▀▀▀█▒╫╫▓▓▀▀▀█▒╫╣█▄
           ▄█▒╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫█└ ,▄  ║▌█Ü  ▄  ║▌╫╫╣█▄
         ,█▒╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫█⌐  "  █▌█╕  ⁿ  ▓▌╫╫╫╫╣█
   ,╓╓  ,█▒╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╣▓▄▄▄█▒╫╫╫▓▄▄▄▓▒╫╫╫╫╫╫╣█
 ▄█╫╬╬╣██▒╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫▓████▒╫╫╫╫╫╫╫╫╫╫╫╫╣▌
▐▌╫╫╫╫╫╫█╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫▒██▒╫╫╫╫╫╫╫╫╫╫╫╫╫╫▌
ⁿ█▒╫╫╫╫╫█╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╣▌
  ▀▀▓▓▀▀║▌╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫█¬
         █▌╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫█▀
          ╙█▒╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╬█─
            ▀█▒╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫▒█▀
              ▀█▓╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫▒▓▀Γ
                 ▀▀▓▒╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫▒█▀Γ
                    └▀▀▓▓▒╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫╫▒▓▓▓▀▀-
                       ▐██╙▀██▓▓▓▓▒▒▒▒╫╫╫╫╫╫╫▒▒▒▒▓▓▓███▀║██
                       ▐██ ▐██                     ║██ ║██

Example: 'cookbook --port 8001 --file ~/data/recipes.json'
Options:`)
		flag.CommandLine.PrintDefaults()
	}
	var port, filename string
	var printVersion bool
	flag.StringVar(&port, "port", "8080", "port that the server listens on")
	flag.StringVar(&filename, "filename", "recipes.json", "file where recipes are saved")
	flag.BoolVar(&printVersion, "version", false, "print the version of this binary")
	flag.Parse()
	if printVersion {
		fmt.Printf(`Cookbook:
version=%s
commit=%s
builddate=%s
`, version, commit, date)
		return
	}
	s := server.New(server.Options{
		Port:    port,
		App:     app.New(filename),
		Version: fmt.Sprintf("version: %s, commit: %s, date: %s", version, commit, date),
	})
	s.Start()
	sigint := make(chan os.Signal, 1)
	signal.Notify(sigint, os.Interrupt)
	<-sigint
	s.Stop()
}

// main.go
package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	// add a custom route
	   app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
        e.Router.Static("/", "static")
	return nil
    })
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

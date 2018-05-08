package app

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"time"

	"github.com/pkg/errors"
	"github.com/schollz/jsonstore"
	"github.com/tscholl2/cookbook/backend/pkg"
)

// App is an object that handles adding/editing recipes in the collection.
type App struct {
	filename string
	store    *jsonstore.JSONStore
}

// New makes a new App instance with data saved at the given file.
func New(filename string) App {
	a := App{
		filename: filename,
	}
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		if err := ioutil.WriteFile(filename, []byte("{}"), 0644); err != nil {
			panic(errors.Wrap(err, fmt.Sprintf("unable to create file %s", filename)))
		}
	}
	store, err := jsonstore.Open(filename)
	if err != nil {
		panic(errors.Wrap(err, fmt.Sprintf("unable to open file %s", filename)))
	}
	a.store = store
	return a
}

func (a *App) set(recipe Recipe) error {
	if err := a.store.Set(string(recipe.ID), recipe); err != nil {
		return err
	}
	return jsonstore.Save(a.store, a.filename)
}

// EditRecipe edits one of the recipes in the collection.
func (a *App) EditRecipe(recipe Recipe) (Recipe, error) {
	if _, ok := a.store.Data[string(recipe.ID)]; !ok {
		return recipe, errors.New("recipe not found")
	}
	recipe.LastEdited = time.Now().UTC()
	return recipe, a.set(recipe)
}

// NewRecipe adds a recipe to the collection.
func (a *App) NewRecipe(recipe Recipe) (Recipe, error) {
	recipe.ID = UUID(pkg.NewUUID())
	recipe.DatePublished = time.Now().UTC()
	recipe.LastEdited = time.Now().UTC()
	return recipe, a.set(recipe)
}

// AllRecipes returns a map containing all recipes in the collection.
func (a *App) AllRecipes() (map[UUID]Recipe, error) {
	all := make(map[UUID]Recipe)
	for k, v := range a.store.Data {
		var r Recipe
		if err := json.Unmarshal(v, &r); err != nil {
			return all, err
		}
		all[UUID(k)] = r
	}
	return all, nil
}

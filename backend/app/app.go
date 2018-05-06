package app

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"time"

	"github.com/tscholl2/cookbook/backend/pkg"
)

type App struct {
	recipes  map[UUID]Recipe
	filename string
}

func New(filename string) App {
	return App{
		recipes:  map[UUID]Recipe{},
		filename: filename,
	}
}

func (a *App) Load() error {
	b, err := ioutil.ReadFile(a.filename)
	if err != nil {
		return err
	}
	return json.Unmarshal(b, &a.recipes)
}

func (a *App) Save() error {
	b, err := json.Marshal(a.recipes)
	if err != nil {
		return err
	}
	return ioutil.WriteFile(a.filename, b, 0644)
}

func (a *App) EditRecipe(recipe Recipe) (Recipe, error) {
	if _, ok := a.recipes[recipe.ID]; !ok {
		return recipe, errors.New("recipe not found")
	}
	recipe.LastEdited = time.Now().UTC()
	a.recipes[recipe.ID] = recipe
	return recipe, a.Save()
}

func (a *App) NewRecipe(recipe Recipe) (Recipe, error) {
	recipe.ID = UUID(pkg.NewUUID())
	recipe.DatePublished = time.Now().UTC()
	recipe.LastEdited = time.Now().UTC()
	a.recipes[recipe.ID] = recipe
	return recipe, a.Save()
}

func (a *App) AllRecipes() map[UUID]Recipe {
	return a.recipes
}

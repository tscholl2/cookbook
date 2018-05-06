package db

import (
	"github.com/tscholl2/cookbook/backend/app"
)

type DB struct {
	// TODO
}

func (db DB) Save(filename string) error {
	// TODO
	return nil
}

func (db DB) Load(filename string) error {
	// TODO
	return nil
}

func GetRecipes() map[string]app.Recipe {
	// TODO
	return nil
}

func AddRecipe(recipe app.Recipe) (app.Recipe, error) {
	// TODO
	return app.Recipe{}, nil
}

func EditRecipe(recipe app.Recipe) (app.Recipe, error) {
	// TODO
	return app.Recipe{}, nil
}

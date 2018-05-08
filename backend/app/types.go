package app

import "time"

// UUID is a unique random identifier like "a1bv33". It is usually 22 characters long.
type UUID string

// Tag is a string like "dinner".
type Tag string

// Duration is a string of the form "1 hour" or so.
type Duration string

// Recipe contains information and metadata about a recipe.
type Recipe struct {
	ID            UUID         `json:"id"`
	Name          string       `json:"name"`
	TotalTime     Duration     `json:"totalTime"`
	Tags          []Tag        `json:"tags"`
	Directions    []string     `json:"directions"`
	Ingredients   []Ingredient `json:"ingredients"`
	Servings      int          `json:"servings"`
	Images        []string     `json:"images"`
	Author        string       `json:"author"`
	LastEdited    time.Time    `json:"lastEdited"`
	DatePublished time.Time    `json:"datePublished"`
}

// Ingredient contains information about a particular ingrediant.
type Ingredient struct {
	Name        string `json:"name"`
	Measurement string `json:"measurement"`
	Amount      string `json:"amount"`
}

package app

import "time"

type UUID string
type Tag string
type Duration string
type Time time.Time

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
	LastEdited    Time         `json:"lastEdited"`
	DatePublished Time         `json:"datePublished"`
}

type Ingredient struct {
	Name        string `json:"name"`
	Measurement string `json:"measurement"`
	Amount      string `json:"amount"`
}

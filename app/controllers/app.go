package controllers

import "github.com/revel/revel"

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	name := "Name of Pilot"
	return c.Render(name)
}

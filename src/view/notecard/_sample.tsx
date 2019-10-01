import * as Superfine from "superfine";
import { addStatefullSample } from "../../../samples";
import { Notecard } from "./notecard";
import { parseRecipe } from "../../utils/parse";

const recipe = parseRecipe(`
# Pancakes

1 pancake
1/4 cup flour
1/2 cup sugar
100 eggs
11 liters
1 pan
1 stove
2 eagles
1 egg
salt

Put pancake in pan
do something else
listen to music
mix something
idk
this is just a test
another test
do something else
listen to music
mix something

`);

addStatefullSample("editing notecard2", recipe, dispatch => recipe => (
  <Notecard
    recipe={recipe}
    onchange={r => console.log("UPDATE: ", dispatch(() => r))}
  />
));

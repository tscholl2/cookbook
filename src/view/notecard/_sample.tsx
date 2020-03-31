import * as Superfine from "superfine";
import { addStatefullSample, addStatelessSample } from "../../../samples";
import { Notecard } from "./notecard";
import { NotecardEditor } from "./notecard-editor";

let recipe = {
  title: "Pancakes",
  ingrediants: [
    "1 pancake",
    "1/4 cup flour",
    "1/2 cup sugar",
    "100 eggs",
    "11 liters",
    "1 pan",
    "1 stove",
    "2 eagles",
    "1 egg",
    "salt"
  ],
  directions: [
    "Put pancake in pan",
    "do something else",
    "listen to music",
    "mix something",
    "idk",
    "this is just a test",
    "another test",
    "do something else",
    "listen to music",
    "mix something"
  ]
};

addStatelessSample("notecard", () => <Notecard recipe={recipe} />);

addStatefullSample("notecard editor", recipe, dispatch => recipe => (
  <NotecardEditor
    recipe={recipe}
    onchange={r =>
      console.log(
        "UPDATE: ",
        dispatch(() => r)
      )
    }
    oncancel={() => {
      console.log("canceled");
      dispatch(() => recipe);
    }}
    error="woops"
  />
));

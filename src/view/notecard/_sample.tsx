import * as Superfine from "superfine";
import { addStatelessSample, addStatefullSample } from "../../../samples";
import { Notecard, EditableNotecard } from "./";

const recipe = {
  title: "Pancakes",
  ingrediants: `1 pancake
1/4 cup flour
1/2 cup sugar
100 eggs
11 liters
1 pan
1 stove
2 eagles
1 egg
salt`,
  directions: `Put pancake in pan
do something else
listen to music
mix something
idk
this is just a test
another test
do something else
listen to music
mix something`
};

addStatelessSample("notecard", () => <Notecard {...recipe} />);

addStatefullSample("editing notecard", recipe, dispatch => recipe => (
  <EditableNotecard
    {...recipe}
    onchange={r => console.log("UPDATE: ", dispatch(() => r))}
  />
));

addStatefullSample(
  "editable notecard",
  { recipe, focus: false },
  dispatch => state => (
    <div>
      {state.focus ? (
        <EditableNotecard
          {...state.recipe}
          onblur={() => dispatch(s => ({ ...s, focus: false }))}
        />
      ) : (
        <Notecard
          {...state.recipe}
          onclick={() => dispatch(s => ({ ...s, focus: true }))}
        />
      )}
    </div>
  )
);

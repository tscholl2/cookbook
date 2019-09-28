import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State } from "../../model";
import { encodeRecipes, validate, parseRecipes } from "../../utils/parse";
import { save } from "../../utils/api";

export function Home(dispatch: Dispatch<State>) {
  const validateAndSaveInput = (e: any) => {
    console.log(e.target);
    const i = parseInt(e.target.getAttribute("name"), 10);
    const s = e.target.value;
    console.log(e);
    const error = validate(s);
    if (error) {
      dispatch(state => ({ ...state, editingError: error }));
      console.error(error);
      return;
    }
    dispatch(s2 => {
      const state = { ...s2 };
      state.editing = undefined;
      state.editingError = undefined;
      state.recipes = state.recipes!.splice(0);
      state.recipes[i] = parseRecipes(s)[0];
      console.log("recipes updated", i, s, JSON.stringify(state.recipes));
      save(state.user!, state.recipes);
      return state;
    });
  };
  const setFocus = (e: any) => {
    e.preventDefault();
    dispatch(state => ({ ...state, editing: e.target.getAttribute("name") }));
  };
  const onKeyDown = (e: any) => {
    if (e.keyCode === 9 || e.keyCode === 27) {
      e.preventDefault();
      validateAndSaveInput(e);
    }
  };
  return function({ user, recipes, editing }: State) {
    return [
      <h2 key="title">Welcome {user}!</h2>,
      recipes && recipes.length > 0 ? (
        <ul key="list">
          {recipes.map((r, i) =>
            editing != i ? (
              <li key={i} name={i} onclick={setFocus}>
                {JSON.stringify(r)}
              </li>
            ) : (
              <li key={i}>
                <textarea
                  name={i}
                  value={encodeRecipes([r])}
                  onkeydown={onKeyDown}
                  onblur={validateAndSaveInput}
                ></textarea>
                <img
                  style="display:none;"
                  src="#"
                  onerror={(e: any) => {
                    // TODO this is just bad
                    e.target.previousSibling.focus();
                    e.target.previousSibling.scrollTop = 0;
                    e.target.previousSibling.selectionEnd = 0;
                  }}
                ></img>
                <button>save</button>
              </li>
            )
          )}
        </ul>
      ) : (
        <h3 key="empty">No recipes :(</h3>
      ),
      <button key="new" onclick={() => dispatch(state => ({ ...state }))}>
        Add
      </button>
    ];
  };
}

import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State } from "../../model";
import { encodeRecipes } from "../../utils/parse";

export function Home(dispatch: Dispatch<State>) {
  const setFocus = (e: any) => {
    e.preventDefault();
    dispatch(state => ({ ...state, editing: e.target.getAttribute("name") }));
  };
  const unsetFocus = (e: any) => {
    e.preventDefault();
    if (e.keyCode === 9 || e.keyCode === 27) {
      dispatch(state => ({ ...state, editing: e.target.getAttribute("name") }));
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
                  value={encodeRecipes([r])[0]}
                  onkeydown={unsetFocus}
                  onchange={(e: any) => console.log(`SAVING ${e.target.value}`)}
                ></textarea>
                <img
                  style="display:none;"
                  src="#"
                  onerror={(e: any) =>
                    // TODO this is just bad
                    e.target.previousSibling.focus()
                  }
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

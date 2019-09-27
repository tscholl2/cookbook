import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State } from "../../model";

export function Home(dispatch: Dispatch<State>) {
  return function(state: State) {
    return [
      <h2 key="title">Welcome {state.user}!</h2>,
      state.recipes && !isEmpty(state.recipes) ? (
        <ul key="list">
          {Object.entries(state.recipes).map(value => (
            <li key={value[0]}>{JSON.stringify(value[1].data)}</li>
          ))}
        </ul>
      ) : (
        <h3 key="empty">No recipes :(</h3>
      ),
      <button key="new">Add</button>
    ];
  };
}

function isEmpty(object: { [key: string]: any } = {}) {
  for (let _ in object) {
    return true;
  }
  return false;
}

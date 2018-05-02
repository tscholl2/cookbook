import { h } from "src/view/h";
import { Dispatch } from "src/controller";
import { State, actionsCreator } from "src/model";
import { set } from "icepick";

export function HomePage(dispatch: Dispatch<State>) {
  const actions = actionsCreator(dispatch);
  return (state: State) => (
    <main
      oncreate={
        state.api.status.allRecipes.timestamp === undefined && actions.api.downloadAllRecipes
      }
    >
      <button style={{ width: "100px", height: "100px" }} onclick={actions.clearAndGoToNewRecipe}>
        new
      </button>
      <button style={{ width: "100px", height: "100px" }} onclick={actions.router.goToAll}>
        view
      </button>
      <h1>Counter</h1>
      <h1>{state.count}</h1>
      <button onclick={() => dispatch(s => set(s, "count", state.count - 1))}>-</button>
      <button onclick={() => dispatch(s => set(s, "count", state.count + 1))}>+</button>
    </main>
  );
}

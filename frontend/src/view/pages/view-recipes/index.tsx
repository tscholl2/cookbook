import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { createSelector } from "reselect";

export const ViewRecipesPage = (dispatch: Dispatch<State>) => {
  return createSelector(
    (state: State) => Object.keys(state.api.data.recipes).map(id => state.api.data.recipes[id]),
    recipes => {
      return <div>{recipes.map(r => <li key={r.id}>{JSON.stringify(r)}</li>)}</div>;
    },
  );
};

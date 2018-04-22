import { h } from "src/view/h";
import { State } from "src/model";
import { actionsCreator } from "src/model/actions";
import { createFormSelector } from "src/model/selectors";
import { Dispatch } from "src/controller";
import { createSelector } from "reselect";

export const AllRecipesPage = (dispatch: Dispatch<State>) => {
  const formSelector = createFormSelector("all-recipe-search", { initialValues: { search: "" } })(
    dispatch,
  );
  const actions = actionsCreator(dispatch);
  return createSelector(
    (state: State) => Object.keys(state.api.data.recipes).map(id => state.api.data.recipes[id]),
    (state: State) => state.api.status.allRecipes,
    formSelector,
    (recipes, status, form) => {
      if (status.isLoading || status.timestamp === undefined) {
        return [
          <h1
            oncreate={status.timestamp === undefined ? actions.api.downloadAllRecipes : undefined}
          >
            ...loading recipes...
          </h1>,
          <progress />,
        ];
      }
      return [
        <h1>All Recipes</h1>,
        <aside>
          <label>
            Search:
            <input
              name="search"
              type="text"
              placeholder="...search"
              value={form.values.search}
              onchange={form.handleChange}
              onblur={form.handleBlur}
              onfocus={form.handleFocus}
            />
          </label>
        </aside>,
        <ul>
          {recipes.map(r => (
            <li key={r.id} onclick={() => actions.router.goToRecipe(r.id)}>
              {JSON.stringify(r)}
            </li>
          ))}
        </ul>,
      ];
    },
  );
};

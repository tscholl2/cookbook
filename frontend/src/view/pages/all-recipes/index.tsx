import { h } from "src/view/h";
import { State } from "src/model";
import { actionsCreator } from "src/model/actions";
import { createFormSelector } from "src/model/selectors";
import { Dispatch } from "src/controller";
import { createSelector } from "reselect";
import Fuse from "fuse.js";

export const AllRecipesPage = (dispatch: Dispatch<State>) => {
  const formSelector = createFormSelector("all-recipe-search", { search: "" })(dispatch);
  const recipesSelector = createSelector(
    (state: State) => state.api.data.recipes,
    recipes => Object.keys(recipes).map(id => recipes[id]),
  );
  const actions = actionsCreator(dispatch);
  return createSelector(
    (state: State) => state.api.status.allRecipes,
    formSelector,
    (state: State) => {
      const form = formSelector(state);
      const recipes = recipesSelector(state);
      if (!form.values.search) {
        return recipes;
      }
      const fuse = new Fuse(recipes, { shouldSort: true, keys: ["name", "directions"] });
      return fuse.search<typeof recipes[0]>(form.values.search).slice(0, 5);
    },
    (status, form, recipes) => {
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
              oninput={form.handleChange}
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

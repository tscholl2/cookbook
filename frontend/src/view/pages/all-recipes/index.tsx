import { h } from "src/view/h";
import { State } from "src/model";
import { actionsCreator } from "src/model/actions";
import { Dispatch } from "src/controller";
import { createSelector } from "reselect";
import { Preview } from "./preview";
import Fuse from "fuse.js";

export const AllRecipesPage = (dispatch: Dispatch<State>) => {
  const actions = actionsCreator(dispatch);
  const formSelector = actions.forms.newSelectFormProps("all-recipe-search", {
    search: "",
    tags: "",
    numberOfIngrediants: undefined as number | undefined,
  });
  const recipesSelector = createSelector(
    (state: State) => state.api.data.recipes,
    recipes => Object.keys(recipes).map(id => recipes[id]),
  );
  return createSelector(
    (state: State) => state.api.status.allRecipes,
    (state: State) => formSelector(state.forms),
    (state: State) => {
      const form = formSelector(state.forms);
      let recipes = recipesSelector(state);
      if (form.values.numberOfIngrediants !== undefined && form.values.numberOfIngrediants > 0) {
        recipes = recipes.filter(r => r.ingredients.length <= form.values.numberOfIngrediants!);
      }
      if (form.values.tags) {
        const tags = form.values.tags
          .split(",")
          .map(s => s.trim())
          .filter(s => s);
        // TODO: fuzz search tags
        recipes = recipes.filter(r => r.tags.find(t => tags.indexOf(t) > -1) !== undefined);
      }
      if (!form.values.search) {
        return recipes;
      }
      const fuse = new Fuse(recipes, { shouldSort: true, keys: ["name", "directions"] });
      return fuse.search<typeof recipes[0]>(form.values.search).slice(0, 5);
    },
    (status, form, recipes) => {
      if (status.isLoading || status.timestamp === undefined) {
        return (
          <main>
            <h1
              oncreate={status.timestamp === undefined ? actions.api.downloadAllRecipes : undefined}
            >
              ...loading recipes...
            </h1>,
            <progress />,
          </main>
        );
      }
      const tags = form.values.tags
        .split(",")
        .map(s => s.trim())
        .filter(s => s);
      return (
        <main class="cookbook-all-recipes-main">
          <aside>
            <form onsubmit={form.handleSubmit}>
              <fieldset>
                <legend>Search</legend>
                <div class="form-group">
                  <label class="form-label" for="input-search">
                    Contains
                  </label>
                  <input
                    id="input-search"
                    class="form-input"
                    name="search"
                    type="search"
                    placeholder="chop"
                    value={form.values.search}
                    oninput={form.handleChange}
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="input-tags">
                    Tags
                  </label>
                  <input
                    id="input-tags"
                    class="form-input"
                    name="tags"
                    type="text"
                    placeholder="tag1, tag2"
                    value={form.values.tags}
                    oninput={form.handleChange}
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="input-numberOfIngrediants">
                    Number of Ingrediants
                  </label>
                  <input
                    id="input-numberOfIngrediants"
                    class="form-input"
                    name="numberOfIngrediants"
                    type="number"
                    placeholder="3"
                    value={form.values.numberOfIngrediants}
                    oninput={form.handleChange}
                  />
                </div>
              </fieldset>
            </form>
          </aside>
          <div class="cookbook-all-recipes-list-container">
            {form.values.search && (
              <p>
                Recipes containing <span class="label cookbook-tag">{form.values.search}</span>
              </p>
            )}
            {tags.length > 0 && (
              <p>Recipes with tags {tags.map(t => <span class="label cookbook-tag">{t}</span>)}</p>
            )}
            {form.values.numberOfIngrediants !== undefined &&
              form.values.numberOfIngrediants > 0 && (
                <p>
                  Recipes with at most
                  <span class="label cookbook-tag">{form.values.numberOfIngrediants}</span>
                  ingrediants
                </p>
              )}
            {recipes.length === 0 ? (
              <div class="empty">
                <div class="empty-icon">
                  <img src={require("./empty-preview.svg")} />
                </div>
                <p class="empty-title h5">No recipes found.</p>
                <p class="empty-subtitle">Click the button to add a recipe.</p>
                <div class="empty-action">
                  <button class="btn btn-primary" onclick={actions.router.goToNew}>
                    New Recipe
                  </button>
                </div>
              </div>
            ) : (
              <ul class="cookbook-all-recipes-list">
                {recipes.map(r => (
                  <li
                    class="cookbook-all-recipes-listitem"
                    key={r.id}
                    onclick={() => actions.router.goToRecipe(r.id)}
                  >
                    <Preview recipe={r} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      );
    },
  );
};
declare const require: any;

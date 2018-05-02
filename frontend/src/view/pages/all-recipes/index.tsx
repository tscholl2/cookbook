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
      const tags = form.values.tags
        .split(",")
        .map(s => s.trim())
        .filter(s => s);
      return [
        <div class="columns">
          <aside class="column col-3 cookbook-all-recipes-sidebar">
            <div class="form-group">
              <label class="form-label" for="input-search">
                Search
              </label>
              <input
                id="input-search"
                class="form-input"
                name="search"
                type="search"
                placeholder="Search"
                value={form.values.search}
                oninput={form.handleChange}
                onblur={form.handleBlur}
                onfocus={form.handleFocus}
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
                onblur={form.handleBlur}
                onfocus={form.handleFocus}
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
                onblur={form.handleBlur}
                onfocus={form.handleFocus}
              />
            </div>
          </aside>
          <div class="divider-vert" data-content="" />
          <div class="column">
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
                  <span class="label cookbook-tag">{form.values.numberOfIngrediants}</span>{" "}
                  ingrediants
                </p>
              )}
            <ul class="cookbook-all-recipes-list">
              {recipes.map(r => (
                <li class="cookbook-all-recipes-listitem" key={r.id}>
                  <button onclick={() => actions.editRecipe(r.id)}>edit</button>
                  <div onclick={() => actions.router.goToRecipe(r.id)}>
                    <Preview recipe={r} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>,
      ];
    },
  );
};

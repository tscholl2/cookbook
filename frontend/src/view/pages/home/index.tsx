import { h } from "src/view/h";
import { Dispatch } from "src/controller";
import { State, actionsCreator } from "src/model";
import { createSelector } from "reselect";
import "./style.scss";

export function HomePage(dispatch: Dispatch<State>) {
  const actions = actionsCreator(dispatch);
  const recipeListSelector = createSelector(
    (state: State) => state.api.data.recipes,
    recipes => Object.keys(recipes).map(k => recipes[k]),
  );
  const recipeCountSelector = createSelector(recipeListSelector, arr => arr.length);
  const recentRecipeSelector = createSelector(
    recipeListSelector,
    arr =>
      arr.sort(
        (a, b) =>
          a.datePublished < b.datePublished ? -1 : a.datePublished > b.datePublished ? 1 : 0,
      )[0],
  );
  return createSelector(recipeCountSelector, recentRecipeSelector, (count, recentRecipe) => (
    <main class="cookbook-home-page">
      <p>
        Found <span class="chip">{count}</span> recipes
      </p>
      {recentRecipe && (
        <p>
          Most recent recipe:{" "}
          <a class="btn btn-link" onclick={() => actions.router.goToRecipe(recentRecipe.id)}>
            {recentRecipe.name}
          </a>
        </p>
      )}
      <div class="columns text-center">
        <div class="column col-6 col-sm-12">
          <button class="btn btn-lg" onclick={actions.router.goToAll}>
            View Recipes
          </button>
        </div>
        <div class="column col-6 col-sm-12">
          <button class="btn btn-lg" onclick={actions.router.goToNew}>
            Add Recipe
          </button>
        </div>
      </div>
    </main>
  ));
}

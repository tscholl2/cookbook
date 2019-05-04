import * as View from "../../h";
import { Dispatch } from "../../../controller";
import { State } from "../../../model";
import { actionsCreator } from "../../../model/actions";
import { createSelector } from "reselect";
import { sort } from "icepick";
import "./style.scss";

export function AboutPage(dispatch: Dispatch<State>) {
  const actions = actionsCreator(dispatch);
  const recipesSelector = createSelector(
    (state: State) => state.api.data.recipes,
    recipes =>
      sort(Object.keys(recipes).map(k => recipes[k]), (a, b) =>
        a.datePublished < b.datePublished ? -1 : a.datePublished === b.datePublished ? 0 : 1,
      ),
  );
  const oldestSelector = createSelector(
    recipesSelector,
    recipes => recipes[0],
  );
  const newestSelector = createSelector(
    recipesSelector,
    recipes => recipes[recipes.length - 1],
  );
  const mostIngrediantsSelector = createSelector(
    recipesSelector,
    recipes => {
      if (recipes.length === 0) {
        return;
      }
      let R = recipes[0];
      for (let r of recipes) {
        if (r.ingredients.length > R.ingredients.length) {
          R = r;
        }
      }
      return R;
    },
  );
  return (state: State) => {
    const oldest = oldestSelector(state);
    const newest = newestSelector(state);
    const mostIngrediants = mostIngrediantsSelector(state);
    return (
      <main class="cookbook-about-page">
        <h2>Server</h2>
        <section>
          <div class="card">
            <div class="card-header">
              <div class="card-title h5">Version</div>
            </div>
            <div class="card-body">
              {(/version:\s*([^,]*)/.exec(state.api.data.server.version) || [])[1]}
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="card-title h5">Commit</div>
            </div>
            <div class="card-body">
              {(/commit:\s*([^,]*)/.exec(state.api.data.server.version) || [])[1]}
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="card-title h5">Build Date</div>
            </div>
            <div class="card-body">
              {(/built:\s*([^,]*)/.exec(state.api.data.server.version) || [])[1]}
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="card-title h5">Uptime</div>
            </div>
            <div class="card-body">{state.api.data.server.uptime}</div>
          </div>
        </section>
        <h2>Recipe Stats</h2>
        <section>
          <div class="card">
            <div class="card-header">
              <div class="card-title h5">Number of Recipes</div>
            </div>
            <div class="card-body">{Object.keys(state.api.data.recipes).length}</div>
          </div>
          {oldest && (
            <div class="card">
              <div class="card-header">
                <div class="card-title h5">Oldest Recipe</div>
                <div class="card-subtitle text-gray">
                  {new Date(oldest.datePublished).toLocaleString()}
                </div>
              </div>
              <div class="card-body">
                <a class="c-hand" onclick={() => actions.router.goToRecipe(oldest.id)}>
                  {oldest.name}
                </a>
              </div>
            </div>
          )}
          {newest && (
            <div class="card">
              <div class="card-header">
                <div class="card-title h5">Newest Recipe</div>
                <div class="card-subtitle text-gray">
                  {new Date(newest.datePublished).toLocaleString()}
                </div>
              </div>
              <div class="card-body">
                <a class="c-hand" onclick={() => actions.router.goToRecipe(newest.id)}>
                  {newest.name}
                </a>
              </div>
            </div>
          )}
          {mostIngrediants && (
            <div class="card">
              <div class="card-header">
                <div class="card-title h5">Most Ingrediants</div>
                <div class="card-subtitle text-gray">{mostIngrediants.ingredients.length}</div>
              </div>
              <div class="card-body">
                <a class="c-hand" onclick={() => actions.router.goToRecipe(mostIngrediants.id)}>
                  {mostIngrediants.name}
                </a>
              </div>
            </div>
          )}
        </section>
      </main>
    );
  };
}

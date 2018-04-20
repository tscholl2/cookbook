import { h } from "src/view/h";
import { State } from "src/model";
import { goTo } from "src/model/router";
import { Dispatch } from "src/controller";
import { set } from "icepick";
import { bindDownloadAllRecipes } from "src/model/api";
import { pathsMatcher } from "src/utils/path-matcher";
import { AllRecipesPage } from "src/view/pages/all-recipes";
import { NewRecipePage } from "src/view/pages/new-recipe";
import { ViewRecipePage } from "src/view/pages/view-recipe";

export const View = (dispatch: Dispatch<State>) => {
  const paths = [
    { path: "/view/:recipeID", component: ViewRecipePage(dispatch) },
    { path: "/view", component: AllRecipesPage(dispatch) },
    { path: "/new", component: NewRecipePage(dispatch) },
    {
      path: "*",
      component: ({ count, route: { path }, api }: State) => (
        <div
          oncreate={api.status.allRecipes.timestamp ? undefined : bindDownloadAllRecipes(dispatch)}
        >
          <h1>Counter</h1>
          <h1>{count}</h1>
          <h1>{path}</h1>
          <button onclick={() => dispatch(s => set(s, "count", count - 1))}>-</button>
          <button onclick={() => dispatch(s => set(s, "count", count + 1))}>+</button>
          <button onclick={() => dispatch(goTo("/new"))}>new</button>
          <button onclick={() => dispatch(goTo("/view"))}>view</button>
        </div>
      ),
    },
  ];
  const matcher = pathsMatcher(paths.map(r => r.path));
  return (state: State) => {
    const match = matcher(state.route.path)!;
    return paths[match.index].component(state, match.params);
  };
};

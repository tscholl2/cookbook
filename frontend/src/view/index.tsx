import { h } from "src/view/h";
import { State } from "src/model";
import { goTo } from "src/model/router";
import { Dispatch } from "src/controller";
import { set } from "icepick";
import { pathsMatcher } from "src/utils/path-matcher";
import { ViewRecipesPage } from "src/view/pages/view-recipes";
import { NewRecipePage } from "src/view/pages/new-recipe";

export const View = (dispatch: Dispatch<State>) => {
  const paths = [
    { path: "/view", component: ViewRecipesPage(dispatch) },
    { path: "/new", component: NewRecipePage(dispatch) },
    {
      path: "*",
      component: ({ count, route: { path } }: State) => (
        <div>
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
    return paths[matcher(state.route.path)!.index].component(state);
  };
};

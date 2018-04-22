import { h } from "src/view/h";
import { State, actions } from "src/model";
import { Dispatch } from "src/controller";
import { set } from "icepick";
import { AllRecipesPage } from "./pages/all-recipes";
import { NewRecipePage } from "./pages/new-recipe";
import { ViewRecipePage } from "./pages/view-recipe";
import { Footer } from "./components/footer";
import { ConnectHeader } from "./components/header";
import { selectPageName, PageName } from "src/model/selectors";

export const View = (dispatch: Dispatch<State>) => {
  const Header = ConnectHeader(dispatch);
  const goToNew = actions.router.goToNew(dispatch);
  const goToAll = actions.router.goToAll(dispatch);
  const pages: { [K in PageName]: (state: State) => JSX.Element | Array<JSX.Element> } = {
    [PageName.ALL_RECIPES]: AllRecipesPage(dispatch),
    [PageName.EDIT_RECIPE]: NewRecipePage(dispatch),
    [PageName.RECIPE]: ViewRecipePage(dispatch),
    [PageName.HOME]: state => (
      <div>
        <h1>Counter</h1>
        <h1>{state.count}</h1>
        <h1>{state.route.path}</h1>
        <button onclick={() => dispatch(s => set(s, "count", state.count - 1))}>-</button>
        <button onclick={() => dispatch(s => set(s, "count", state.count + 1))}>+</button>
        <button onclick={goToNew}>new</button>
        <button onclick={goToAll}>view</button>
      </div>
    ),
  };
  return (state: State) => {
    return (
      <div>
        {Header(state)}
        <main>{pages[selectPageName(state)](state)}</main>
        <Footer />
      </div>
    );
  };
};

import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { AllRecipesPage } from "./pages/all-recipes";
import { NewRecipePage } from "./pages/new-recipe";
import { ViewRecipePage } from "./pages/view-recipe";
import { HomePage } from "./pages/home";
import { Footer } from "./components/footer";
import { ConnectHeader } from "./components/header";
import { PageName } from "src/model/router";
import { selectorsCreator } from "src/model/selectors";

import "./style.scss";

export const View = (dispatch: Dispatch<State>) => {
  const Header = ConnectHeader(dispatch);
  const pages: { [K in PageName]: (state: State) => JSX.Element | Array<JSX.Element> } = {
    [PageName.ALL_RECIPES]: AllRecipesPage(dispatch),
    [PageName.EDIT_RECIPE]: NewRecipePage(dispatch),
    [PageName.RECIPE]: ViewRecipePage(dispatch),
    [PageName.HOME]: HomePage(dispatch),
  };
  return (state: State) => {
    const selectors = selectorsCreator(state);
    return (
      <div id="app">
        <Header {...state} />
        <main>{pages[selectors.router.selectPageName()](state)}</main>
        <Footer />
      </div>
    );
  };
};

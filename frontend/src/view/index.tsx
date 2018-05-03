import { h } from "src/view/h";
import { Dispatch } from "src/controller";
import { State } from "src/model";
import { PageName } from "src/model/router";
import { actionsCreator } from "src/model/actions";
import { AllRecipesPage } from "./pages/all-recipes";
import { EditRecipePage } from "./pages/edit-recipe";
import { ViewRecipePage } from "./pages/view-recipe";
import { HomePage } from "./pages/home";
import { Footer } from "./components/footer";
import { ConnectHeader } from "./components/header";

import "./style.scss";

export const View = (dispatch: Dispatch<State>) => {
  const actions = actionsCreator(dispatch);
  const Header = ConnectHeader(dispatch);
  const pages: { [K in PageName]: (state: State) => JSX.Element | Array<JSX.Element> } = {
    [PageName.ALL_RECIPES]: AllRecipesPage(dispatch),
    [PageName.EDIT_RECIPE]: EditRecipePage(dispatch),
    [PageName.NEW_RECIPE]: EditRecipePage(dispatch),
    [PageName.RECIPE]: ViewRecipePage(dispatch),
    [PageName.HOME]: HomePage(dispatch),
  };
  return (state: State) => {
    return (
      <div id="app">
        <Header {...state} />
        {pages[actions.router.selectPageName(state.route)](state)}
        <Footer />
      </div>
    );
  };
};

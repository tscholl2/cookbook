import { h } from "src/view/h";
import { Dispatch } from "src/controller";
import { State } from "src/model";
import { PageName } from "src/model/router";
import { actionsCreator } from "src/model/actions";
import { AllRecipesPage } from "./pages/all-recipes";
import { EditRecipePage } from "./pages/edit-recipe";
import { ViewRecipePage } from "./pages/view-recipe";
import { AboutPage } from "./pages/about";
import { NotFoundPage } from "./pages/not-found";
import { HomePage } from "./pages/home";
import { connectFooter } from "./components/footer";
import { connectHeader } from "./components/header";

import "./style.scss";

export const View = (dispatch: Dispatch<State>) => {
  const actions = actionsCreator(dispatch);
  const Header = connectHeader(dispatch);
  const Footer = connectFooter(dispatch);
  const pages: { [K in PageName]: (state: State) => JSX.Element | Array<JSX.Element> } = {
    [PageName.ALL_RECIPES]: AllRecipesPage(dispatch),
    [PageName.EDIT_RECIPE]: EditRecipePage(dispatch),
    [PageName.NEW_RECIPE]: EditRecipePage(dispatch),
    [PageName.RECIPE]: ViewRecipePage(dispatch),
    [PageName.HOME]: HomePage(dispatch),
    [PageName.ABOUT]: AboutPage(dispatch),
    [PageName.NOT_FOUND]: NotFoundPage(dispatch),
  };
  const LoadingScreen = (
    <main>
      <h2 style="text-align:center;">Downloading Recipes...</h2>
      <div class="loading loading-lg" />
    </main>
  );
  return (state: State) => {
    const isLoading =
      state.api.status.allRecipes.timestamp === undefined || state.api.status.allRecipes.isLoading;
    // on start download all recipes
    const oncreate =
      state.api.status.allRecipes.timestamp === undefined
        ? () => {
            actions.api.downloadAllRecipes();
            actions.api.status();
          }
        : undefined;
    return (
      <div id="app" oncreate={oncreate}>
        <Header {...state} />
        {isLoading ? LoadingScreen : pages[actions.router.selectPageName(state.route)](state)}
        <Footer />
      </div>
    );
  };
};

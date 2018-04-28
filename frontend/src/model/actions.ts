import { Reducer, Dispatch } from "src/controller";
import { set } from "icepick";
import { createActions as formsActions } from "./forms";
import { createActions as routeActions } from "./router";
import { createActions as apiActions } from "./api";
import { createActions as uiActions } from "./ui";
import { State } from "./";
import { recipeToInput } from "src/view/pages/new-recipe/types"; // TODO: move this to utils

export function actionsCreator(dispatch: Dispatch<State>) {
  const actions = {
    forms: formsActions(dispatchSlicer("forms")(dispatch)),
    router: routeActions(dispatchSlicer("route")(dispatch)),
    api: apiActions(dispatchSlicer("api")(dispatch)),
    uiActions: uiActions(dispatchSlicer("ui")(dispatch)),
    clearAndGoToNewRecipe: () => {
      actions.forms.clearForm("new-recipe");
      actions.router.goToNew();
    },
    editRecipe: (id: string) => {
      console.log("editing");

      let state: State;
      dispatch(s => (state = s)); // TODO: dont do this
      const recipe = state!.api.data.recipes[id];
      if (recipe === undefined) {
        console.error(`recipe ${id} not found`);
        return;
      }
      console.log("foing");
      actions.forms.setForm("new-recipe", recipeToInput(recipe));
      actions.router.goToNew();
    },
  };
  return actions;
}

function dispatchSlicer<K extends keyof State>(
  k: K,
): (dispatch: Dispatch<State>) => Dispatch<State[K]> {
  const f = reducerSlicer(k);
  return d => r => d(f(r));
}

function reducerSlicer<K extends keyof State>(k: K): (r: Reducer<State[K]>) => Reducer<State> {
  // We use Object.assign to carry any debug/devtool info on r to the monkey-patched function.
  return r => Object.assign((state: any) => set(state, k, r(state[k])), r as any);
}

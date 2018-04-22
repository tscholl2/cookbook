import { Reducer, Dispatch } from "src/controller";
import { set } from "icepick";
import { actions as routerActions } from "src/model/router";
import { actions as apiActions } from "src/model/api";
import { State } from "src/model";

export const actions = {
  router: {
    goToRecipe: slice2("route", routerActions.goToRecipe),
    goToNew: slice2("route", routerActions.goToNew),
    goToAll: slice2("route", routerActions.goToAll),
  },
  api: {
    downloadAllRecipes: slice2("api", apiActions.downloadAllRecipes),
  },
};

function slice2<K extends keyof State, T>(
  k: K,
  a: (iDispatch: Dispatch<State[K]>) => T,
): (oDispatch: Dispatch<State>) => T {
  const f = dispatchSlicer(k);
  return d => a(f(d));
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

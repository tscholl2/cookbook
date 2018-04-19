import { Dispatch } from "src/controller";
import { State } from "src/model";
import { setIn, merge } from "icepick";
import { Recipe } from "src/model";

declare const require: any;
const samples: Array<Recipe> = require("samples.json");

export const bindDownloadAllRecipes = (dispatch: Dispatch<State>) => () => {
  dispatch(state =>
    setIn(state, ["api", "status", "allRecipes"], {
      isLoading: true,
      response: undefined,
      timestamp: new Date().toJSON(),
    } as State["api"]["status"]["allRecipes"]),
  );
  return (async () => {
    await new Promise(resolve => setTimeout(1000, resolve));
    dispatch(state => {
      state = setIn(state, ["api", "status", "allRecipes"], {
        isLoading: false,
        response: samples,
        timestamp: new Date().toJSON(),
      } as State["api"]["status"]["allRecipes"]);
      state = merge(state, { api: { data: samples.reduce((p, n) => ({ ...p, [n.id]: n }), {}) } });
      return state;
    });
  })();
};

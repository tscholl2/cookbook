import { Dispatch } from "src/controller";
import { State } from "src/model";
import { setIn } from "icepick";
import { Recipe } from "src/model";

declare const require: any;
const samples: Array<Recipe> = require("samples.json");

export const bindDownloadAllRecipes = (dispatch: Dispatch<State>) => () => {
  dispatch(state =>
    setIn(state, ["api", "allRecipes"], {
      isLoading: true,
      response: undefined,
      timestamp: new Date().toJSON(),
    } as State["api"]["allRecipes"]),
  );
  return (async () => {
    // TODO: download something from somewhere
    await new Promise(resolve => setTimeout(1000, resolve));
    dispatch(state =>
      setIn(state, ["api", "allRecipes"], {
        isLoading: false,
        response: samples,
        timestamp: new Date().toJSON(),
      } as State["api"]["allRecipes"]),
    );
  })();
};

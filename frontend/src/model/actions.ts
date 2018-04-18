import { Dispatch } from "src/controller";
import { State } from "src/model";
import { setIn } from "icepick";

export const bindDownloadAllRecipes = (dispatch: Dispatch<State>) => () => {
  dispatch(state =>
    setIn(state, ["api", "allRecipes"], {
      isLoading: true,
      response: undefined,
      timestamp: new Date().toJSON()
    } as State["api"]["allRecipes"])
  );
  return (async () => {
    // TODO: download something from somewhere
    await new Promise(resolve => setTimeout(1000, resolve));
    dispatch(state =>
      setIn(state, ["api", "allRecipes"], {
        isLoading: false,
        response: [],
        timestamp: new Date().toJSON()
      } as State["api"]["allRecipes"])
    );
  })();
};

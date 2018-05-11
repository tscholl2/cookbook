import { Dispatch } from "src/controller";
import { logReducer } from "src/controller/redux-devtools";
import { setIn } from "icepick";
import { API, Recipe } from "src/api";

export interface State {
  status: {
    allRecipes: APIStatus;
    submitNewRecipe: APIStatus;
    serverStatus: APIStatus;
  };
  data: {
    recipes: { [id: string]: Recipe };
    server: {
      version: string;
      uptime: string;
    };
  };
}

export const initialState: State = {
  status: {
    allRecipes: {},
    submitNewRecipe: {},
    serverStatus: {},
  },
  data: {
    recipes: {},
    server: { version: "", uptime: "" },
  },
};

export interface APIStatus {
  isLoading?: boolean;
  error?: string;
  timestamp?: string;
}

export function createActions(dispatch: Dispatch<State>) {
  const w = wrap(dispatch);
  return {
    submitNewRecipe: (recipe: Recipe) =>
      w("submitNewRecipe", () =>
        (recipe.id === "" ? API.newRecipe : API.editRecipe)(recipe).then(newRecipe => {
          dispatch((state: State) =>
            setIn(
              state,
              ["data", "recipes", newRecipe.id],
              newRecipe as State["data"]["recipes"][string],
            ),
          );
          return newRecipe;
        }),
      ),
    downloadAllRecipes: () =>
      w("allRecipes", () =>
        API.downloadAllRecipes().then(recipes =>
          dispatch(state => setIn(state, ["data", "recipes"], recipes as State["data"]["recipes"])),
        ),
      ),
    status: () =>
      w("serverStatus", () =>
        API.status().then(status =>
          dispatch(state => setIn(state, ["data", "server"], status as State["data"]["server"])),
        ),
      ),
  };
}

function wrap(dispatch: Dispatch<State>) {
  return <K extends keyof State["status"], T>(
    statusName: K,
    fn: () => Promise<T>,
  ): Promise<T | undefined> => {
    dispatch(
      logReducer(statusName.toUpperCase() + "_REQUEST", [], state =>
        setIn(state, ["status", statusName], {
          isLoading: true,
          error: undefined,
          timestamp: new Date().toJSON(),
        }),
      ),
    );
    return fn()
      .then(r => {
        dispatch(
          logReducer(statusName.toUpperCase() + "_SUCCESS", [], state =>
            setIn(state, ["status", statusName], {
              isLoading: false,
              timestamp: new Date().toJSON(),
            }),
          ),
        );
        return r;
      })
      .catch(e => {
        console.error(e);
        dispatch(
          logReducer(statusName.toUpperCase() + "_FAILURE", {}, state =>
            setIn(state, ["status", statusName], {
              isLoading: false,
              error: `${e}`,
              timestamp: new Date().toJSON(),
            }),
          ),
        );
        return undefined;
      });
  };
}

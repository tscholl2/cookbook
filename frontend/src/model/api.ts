import { Dispatch } from "src/controller";
import { logReducer } from "src/controller/redux-devtools";
import { setIn, chain } from "icepick";
import { API, Recipe } from "src/api";

export interface State {
  status: {
    allRecipes: APIStatus;
    submitNewRecipe: APIStatus;
  };
  data: {
    recipes: { [id: string]: Recipe };
  };
}

export const initialState: State = {
  status: {
    allRecipes: {},
    submitNewRecipe: {},
  },
  data: {
    recipes: {},
  },
};

export interface APIStatus {
  isLoading?: boolean;
  error?: string;
  timestamp?: string;
}

// TODO: DRY-er
export function createActions(dispatch: Dispatch<State>) {
  return {
    submitNewRecipe: (recipe: Recipe) => {
      dispatch(
        logReducer("SUBMIT_NEW_RECIPE_REQUEST", { recipe }, state =>
          setIn(state, ["status", "submitNewRecipe"], {
            isLoading: true,
            error: undefined,
            timestamp: new Date().toJSON(),
          } as State["status"]["submitNewRecipe"]),
        ),
      );
      return (recipe.id === "" ? API.newRecipe : API.editRecipe)(recipe)
        .then(recipe => {
          dispatch(
            logReducer("SUBMIT_NEW_RECIPE_SUCCESS", { recipe }, state => {
              state = setIn(state, ["status", "submitNewRecipe"], {
                isLoading: false,
                timestamp: new Date().toJSON(),
              } as State["status"]["submitNewRecipe"]);
              state = setIn(
                state,
                ["data", "recipes", recipe.id],
                recipe as State["data"]["recipes"][typeof recipe.id],
              );
              return state;
            }),
          );
          return recipe;
        })
        .catch(e => {
          console.error(e);
          dispatch(
            logReducer("SUBMIT_NEW_RECIPE_FAILURE", {}, state => {
              return setIn(state, ["status", "submitNewRecipe"], {
                isLoading: false,
                error: `${e}`,
                timestamp: new Date().toJSON(),
              } as State["status"]["submitNewRecipe"]);
            }),
          );
        });
    },
    downloadAllRecipes: () => {
      dispatch(
        logReducer("DOWNLOAD_ALL_REQUEST", [], state =>
          setIn(state, ["status", "allRecipes"], {
            isLoading: true,
            error: undefined,
            timestamp: new Date().toJSON(),
          } as State["status"]["allRecipes"]),
        ),
      );
      API.downloadAllRecipes()
        .then(recipes =>
          dispatch(
            logReducer("DOWNLOAD_ALL_SUCCESS", [], state =>
              chain(state)
                .setIn(["status", "allRecipes"], {
                  isLoading: false,
                  timestamp: new Date().toJSON(),
                } as State["status"]["allRecipes"])
                .setIn(["data", "recipes"], recipes as State["data"]["recipes"])
                .value(),
            ),
          ),
        )
        .catch(e => {
          console.error(e);
          dispatch(
            logReducer("DOWNLOAD_ALL_FAILURE", {}, state => {
              return setIn(state, ["status", "submitNewRecipe"], {
                isLoading: false,
                error: `${e}`,
                timestamp: new Date().toJSON(),
              } as State["status"]["submitNewRecipe"]);
            }),
          );
        });
    },
  };
}

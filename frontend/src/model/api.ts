import { Dispatch } from "src/controller";
import { logReducer } from "src/controller/redux-devtools";
import { setIn, merge } from "icepick";

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

type UUID = string;
type Duration = string;
type Time = string;
type Tag = string;

export interface Recipe {
  id: UUID;
  name: string;
  totalTime: Duration;
  tags: Array<Tag>;
  directions: Array<string>;
  ingredients: Array<Ingredient>;
  servings: number;
  images: Array<string>;
  author: string;
  lastEdited: Time;
  datePublished: Time;
}

export interface Ingredient {
  name: string;
  measurement: string;
  amount: number;
  images: Array<string>;
}

declare const require: any;
const samples: Array<Recipe> = require("./samples.json");

export function createActions(dispatch: Dispatch<State>) {
  return {
    submitNewRecipe: (recipe: Recipe) => {
      recipe = JSON.parse(JSON.stringify(recipe));
      recipe.id = `${Math.random()}`;
      recipe.datePublished = new Date().toJSON();
      recipe.lastEdited = new Date().toJSON();
      dispatch(
        logReducer("SUBMIT_NEW_RECIPE_REQUEST", [], state =>
          setIn(state, ["status", "submitNewRecipe"], {
            isLoading: true,
            response: undefined,
            timestamp: new Date().toJSON(),
          } as State["status"]["submitNewRecipe"]),
        ),
      );
      return (async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(
          logReducer("SUBMIT_NEW_RECIPE_SUCCESS", [], state => {
            state = setIn(state, ["status", "submitNewRecipe"], {
              isLoading: false,
              response: samples,
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
      })();
    },
    downloadAllRecipes: () => {
      dispatch(
        logReducer("DOWNLOAD_ALL_REQUEST", [], state =>
          setIn(state, ["status", "allRecipes"], {
            isLoading: true,
            response: undefined,
            timestamp: new Date().toJSON(),
          } as State["status"]["allRecipes"]),
        ),
      );
      return (async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(
          logReducer("DOWNLOAD_ALL_SUCCESS", [], state => {
            state = setIn(state, ["status", "allRecipes"], {
              isLoading: false,
              response: samples,
              timestamp: new Date().toJSON(),
            } as State["status"]["allRecipes"]);
            state = merge(state, {
              data: { recipes: samples.reduce((p, n) => ({ ...p, [n.id]: n }), {}) },
            });
            return state;
          }),
        );
      })();
    },
  };
}

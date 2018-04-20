import { Dispatch } from "src/controller";
import { State } from "src/model";
import { setIn, merge } from "icepick";

export interface APIStatus {
  isLoading?: boolean;
  error?: string;
  timestamp?: string;
}

type UUID = string;
type Duration = string;
type Time = string;

export interface Recipe {
  id: UUID;
  name: string;
  description: string;
  totalTime: Duration;
  directions: string;
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

export const bindDownloadAllRecipes = (dispatch: Dispatch<State>) => () => {
  dispatch(state =>
    setIn(state, ["api", "status", "allRecipes"], {
      isLoading: true,
      response: undefined,
      timestamp: new Date().toJSON(),
    } as State["api"]["status"]["allRecipes"]),
  );
  return (async () => {
    // await new Promise(resolve => setTimeout(100, resolve));
    dispatch(state => {
      state = setIn(state, ["api", "status", "allRecipes"], {
        isLoading: false,
        response: samples,
        timestamp: new Date().toJSON(),
      } as State["api"]["status"]["allRecipes"]);
      state = merge(state, {
        api: { data: { recipes: samples.reduce((p, n) => ({ ...p, [n.id]: n }), {}) } },
      });
      return state;
    });
  })();
};

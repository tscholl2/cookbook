import { Dispatch } from "src/controller";
import { setIn, merge } from "icepick";

export interface State {
  status: {
    allRecipes: APIStatus;
  };
  data: {
    recipes: { [id: string]: Recipe };
  };
}

export const initialState: State = {
  status: {
    allRecipes: {},
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

export const actions = {
  downloadAllRecipes: (dispatch: Dispatch<State>) => () => {
    dispatch(state =>
      setIn(state, ["status", "allRecipes"], {
        isLoading: true,
        response: undefined,
        timestamp: new Date().toJSON(),
      } as State["status"]["allRecipes"]),
    );
    return (async () => {
      // await new Promise(resolve => setTimeout(100, resolve));
      dispatch(state => {
        state = setIn(state, ["status", "allRecipes"], {
          isLoading: false,
          response: samples,
          timestamp: new Date().toJSON(),
        } as State["status"]["allRecipes"]);
        state = merge(state, {
          data: { recipes: samples.reduce((p, n) => ({ ...p, [n.id]: n }), {}) },
        });
        return state;
      });
    })();
  },
};
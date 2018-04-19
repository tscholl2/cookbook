import { APIStatus, Recipe } from "./api";
import { FormStatus } from "./forms";
import { Route } from "./router";

export interface State {
  count: number;
  api: {
    status: {
      allRecipes: APIStatus;
    };
    data: {
      recipes: { [id: string]: Recipe };
    };
  };
  forms: {
    [key: string]: FormStatus<any>;
  };
  route: Route;
}

export const initialState: Readonly<State> = {
  count: 0,
  api: {
    status: {
      allRecipes: {},
    },
    data: {
      recipes: {},
    },
  },
  forms: {},
  route: {
    path: "",
    data: {},
    title: "",
  },
};

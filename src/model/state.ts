export interface State {
  recipes?: Recipe[];
  user?: string;
  status: "not logged in" | "logging in" | "logged in";
  api: {
    status?: "saving" | "loading" | "error";
    error?: string;
  };
  editor: {
    i?: number;
    value?: Recipe;
    error?: string;
  }
  search: {
    value?: string;
  };
}

export interface Recipe {
  title: string;
  ingrediants: string[];
  directions: string[];
}

export const initialState: State = {
  status: "not logged in",
  search: {},
  editor: {},
  api: {}
};

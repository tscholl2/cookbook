export interface State {
  recipes?: Recipe[];
  user?: string;
  status: "not logged in" | "logging in" | "logged in";
  editing?: string | number;
}

export const initialState: State = { status: "not logged in" };

export interface Recipe {
  title: string;
  ingrediants: string[];
  directions: string[];
}

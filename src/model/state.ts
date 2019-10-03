export interface State {
  recipes?: Recipe[];
  user?: string;
  status: "not logged in" | "logging in" | "logged in";
  editing?: string | number;
  editingError?: string;
}

export interface Recipe {
  title: string;
  ingrediants: string[];
  directions: string[];
}

export const initialState: State = { status: "not logged in" };

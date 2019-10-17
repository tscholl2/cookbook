export interface State {
  recipes?: Recipe[];
  user?: string;
  status: "not logged in" | "logging in" | "logged in";
  editing?: string | number;
  editingError?: string;
  search: {
    value?: string;
    field?: "" | "title" | "ingrediants";
  };
}

export interface Recipe {
  title: string;
  ingrediants: string[];
  directions: string[];
}

export const initialState: State = { status: "not logged in", search: {} };

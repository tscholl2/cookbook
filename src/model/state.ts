export interface State {
  recipes?: string[];
  user?: string;
  status: "not logged in" | "logging in" | "logged in";
  editing?: string | number;
  editingError?: string;
}

export const initialState: State = { status: "not logged in" };

export interface State {
  recipes?: {
    [id: string]: { data: Recipe; editing: string; focus?: boolean };
  };
  user?: string;
  status?: "loading" | "loaded";
}

export interface Recipe {
  title: string;
  ingrediants: string;
  directions: string;
}

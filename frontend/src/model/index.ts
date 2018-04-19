interface APIStatus<T> {
  isLoading?: boolean;
  response?: T;
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

export interface State
  extends Readonly<{
      count: number;
      api: {
        allRecipes: APIStatus<Array<Recipe>>;
      };
      route: {
        path: string;
        data: any;
        title: string;
      };
    }> {}

export const initialState: State = {
  count: 0,
  api: {
    allRecipes: {},
  },
  route: {
    path: "",
    data: {},
    title: "",
  },
};

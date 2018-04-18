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
  directions: Array<string>;
  ingredients: Array<string>;
  servings: number;
  images: Array<string>;
  author: string;
  lastEdited: Time;
  datePublished: Time;
}

export interface State
  extends Readonly<{
      count: number;
      api: {
        allRecipes: APIStatus<Array<Recipe>>;
      };
    }> {}

export const initialState: State = {
  count: 0,
  api: {
    allRecipes: {}
  }
};

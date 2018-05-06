type UUID = string;
type Duration = string;
type Time = string;
type Tag = string;

export interface Recipe {
  id: UUID;
  name: string;
  totalTime: Duration;
  tags: Array<Tag>;
  directions: Array<string>;
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
  amount: string;
}

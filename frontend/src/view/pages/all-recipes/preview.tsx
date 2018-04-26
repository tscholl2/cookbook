import { h } from "src/view/h";
import { Recipe } from "src/model/api";
declare const require: any;
const empty = require("./empty-preview.svg");
import "./style.scss";

export function Preview(props: { recipe: Recipe; key?: string }) {
  const { recipe, ...otherProps } = props;
  return (
    <div class="card cookbook-all-recipes-preview" {...otherProps}>
      <div class="card-image">
        <img class="img-fit-cover" src={recipe.images[0] || empty} />
      </div>
      <div class="card-header">
        <div class="card-title h1">{recipe.name}</div>
        <div class="card-subtitle text-gray">
          Serves {recipe.servings}, Takes {recipe.totalTime}, By {recipe.author}
        </div>
      </div>
      <div class="card-body">#Ingrediants = {recipe.ingredients.length}</div>
    </div>
  );
}

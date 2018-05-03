import { h } from "src/view/h";
import { Recipe } from "src/model/api";
declare const require: any;
const empty = require("./empty-preview.svg");
import "./style.scss";

export function Preview(props: { recipe: Recipe; key?: string }) {
  const { recipe, ...otherProps } = props;

  return (
    <div
      class="card cookbook-all-recipes-preview tooltip"
      data-tooltip={recipe.name}
      {...otherProps}
    >
      <div class="card-image">
        <img class="img-fit-cover" src={recipe.images[0] || empty} />
      </div>
      <div class="card-header">
        <div class="card-title h1">{recipe.name}</div>
        <div class="card-subtitle text-gray">
          By {recipe.author}, {recipe.ingredients.length} Ingrediants, Serves {recipe.servings},
          Takes {recipe.totalTime}
        </div>
      </div>
      <div class="card-body">
        {recipe.tags.map(t => <span class="chip">{t}</span>)}
      </div>
    </div>
  );
}

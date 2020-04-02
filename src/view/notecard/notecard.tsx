import * as Superfine from "superfine";
import { Recipe } from "../../model";
import "./style.scss";

export interface NotecardProps {
  recipe: Recipe;
}

export function Notecard(props: NotecardProps) {
  const {
    recipe: { title = "", ingrediants = [], directions = [] },
    ...otherProps
  } = props;
  return (
    <div {...otherProps} class="notecard">
      <h1 name="title">{title}</h1>
      <ul name="ingrediants">
        {ingrediants.map((s, i) => (
          <li key={`ingrediant-${i}-${s}`}>{s}</li>
        ))}
      </ul>
      <ol name="directions">
        {directions.map((s, i) => (
          <li key={`direction-${i}-${s}`}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

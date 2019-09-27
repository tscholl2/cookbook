import * as Superfine from "superfine";
import "./style.scss";
import { Recipe } from '../../model';



export interface NotecardProps {
  recipe: Recipe;
  onclick?(): void;
  onchange?(r: Recipe): void;
}

export function Notecard(props: NotecardProps) {
  const {
    recipe: { title = "", ingrediants = "", directions = "" },
    ...otherProps
  } = props;
  return (
    <div {...otherProps} class="notecard">
      <h1 name="title">{title}</h1>
      <ul name="ingrediants">
        {ingrediants.split("\n").map((s, i) => (
          <li key={`ingrediant-${i}-${s}`}>{s}</li>
        ))}
      </ul>
      <ol name="directions">
        {directions.split("\n").map((s, i) => (
          <li key={`direction-${i}-${s}`}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

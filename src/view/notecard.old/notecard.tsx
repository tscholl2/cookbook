import * as Superfine from "superfine";
import "./style.scss";

export interface Recipe {
  title: string;
  ingrediants: string;
  directions: string;
}

export interface NotecardProps extends Recipe {
  key?: string;
  onclick?(): void;
}

export function Notecard(props: NotecardProps) {
  const {
    title = "",
    ingrediants = "",
    directions = "",
    ...otherProps
  } = props;
  return (
    <div {...otherProps} class="notecard">
      <h1 name="title">{title}</h1>
      <ul name="ingrediants">
        {stringToList(ingrediants).map((s, i) => (
          <li key={`ingrediant-${i}-${s}`}>{s}</li>
        ))}
      </ul>
      <ol name="directions">
        {stringToList(directions).map((s, i) => (
          <li key={`direction-${i}-${s}`}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

function stringToList(s: string) {
  const arr = s
    .split("\n")
    .map(s => s.trim())
    .filter(s => s !== "");
  return arr.length === 0 ? [""] : arr;
}

import * as Superfine from "superfine";
import "./style.scss";

interface Recipe {
  title: string;
  ingrediants: string;
  directions: string;
}

interface NotecardProps extends Recipe {
  onchange?(recipe: Recipe): void;
}

export function Notecard(props: NotecardProps) {
  const { title = "", ingrediants = "", directions = "", onchange } = props;
  const handlers = {
    contenteditable: onchange != null,
    onfocusout(e: any) {
      let div: HTMLElement | undefined;
      while (div == null || !div.classList.contains("notecard")) {
        div = (div || e.target).parentElement;
      }
      onchange!({
        title: div.getElementsByTagName("h1")!.item(0)!.innerText,
        ingrediants: div.getElementsByTagName("ul")!.item(0)!.innerText,
        directions: div.getElementsByTagName("ol")!.item(0)!.innerText
      });
    },
    onkeydown(e: any) {
      if (false && e.which === 13) {
        e.preventDefault();
        // TODO: save
        console.log("saving...");
      }
    }
  };
  return (
    <div class="notecard">
      <h1 name="title" {...handlers}>
        {title}
      </h1>
      <ul name="ingrediants">
        {stringToList(ingrediants).map((s, i) => (
          <li key={`${i}-${s}`} {...handlers}>
            {s}
          </li>
        ))}
      </ul>
      <ol name="directions">
        {stringToList(directions).map((s, i) => (
          <li key={`${i}-${s}`} {...handlers}>
            {s}
          </li>
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

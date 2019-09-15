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
  let ctrlDown = false,
    ctrlKey = 17,
    cmdKey = 91,
    // vKey = 86,
    // cKey = 67,
    sKey = 83;
  const handlers = {
    contenteditable: onchange != null,
    onfocusout(e: any) {
      let div: HTMLElement | undefined;
      while (div == null || !div.classList.contains("notecard")) {
        div = (div || e.target).parentElement;
      }
      console.log("OLD DIRECTIONS: ", JSON.stringify(directions));
      console.log(
        "NEW DIRECTIONS: ",
        JSON.stringify(
          div
            .getElementsByTagName("ol")!
            .item(0)!
            .innerText.split("\n")
            .map(s => s.trim())
            .filter(s => s !== "")
            .join("\n")
        )
      );
      onchange!({
        title: div.getElementsByTagName("h1")!.item(0)!.innerText,
        ingrediants: div
          .getElementsByTagName("ul")!
          .item(0)!
          .innerText.split("\n")
          .map(s => s.trim())
          .filter(s => s !== "")
          .join("\n"),
        directions: div
          .getElementsByTagName("ol")!
          .item(0)!
          .innerText.split("\n")
          .map(s => s.trim())
          .filter(s => s !== "")
          .join("\n")
      });
    },
    onkeydown(e: any) {
      if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
      if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
      if (ctrlDown && e.keyCode == sKey) {
        console.log("save found!");
        e.preventDefault();
      }
    }
  };
  console.log(
    "ABOUT TO RENDER STR: ",
    JSON.stringify(stringToList(directions))
  );
  return (
    <div class="notecard">
      <h1 name="title" {...handlers}>
        {title}
      </h1>
      <ul name="ingrediants" {...handlers}>
        {stringToList(ingrediants).map((s, i) => (
          <li key={`ingrediant-${i}-${s}`}>{s}</li>
        ))}
      </ul>
      <ol name="directions" {...handlers}>
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

function listElementToString(el: HTMLElement) {
  const arr: string[] = [];
  for (let i = 0; i < el.children.length; i++) {
    const child = el.children.item(i);
    arr.push((child as any).innerText);
  }
  return arr
    .map(s => s.trim())
    .filter(s => s !== "")
    .join("\n");
}

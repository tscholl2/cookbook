import * as Superfine from "superfine";
import { NotecardProps, Recipe } from ".";
import { shallowCompare } from "../../utils";

export interface EditableNotecardProps extends NotecardProps {
  onchange?(r: Recipe): void;
  onblur?(): void;
  key?: string;
}

export function EditableNotecard(props: EditableNotecardProps) {
  const {
    title = "",
    ingrediants = "",
    directions = "",
    onchange,
    onblur,
    ...otherProps
  } = props;
  const handlers = {
    onmouseenter: (e: any) =>
      !e.target.parentElement.contains(document.activeElement) &&
      e.target.focus(),
    onkeydown,
    onkeyup,
    onblur: (e: any) => {
      setTimeout(() => {
        if (e.target.parentElement.contains(document.activeElement)) {
          return;
        }
        let form: HTMLFormElement | undefined;
        while (form == null || !form.classList.contains("notecard")) {
          form = (form || e.target).parentElement;
        }
        const r: any = {};
        for (let i = 0; i < form.elements.length; i++) {
          const item: any = form.elements.item(i)!;
          r[item.name] = item.value;
        }
        if (
          !shallowCompare(r, { title, ingrediants, directions }) &&
          onchange
        ) {
          onchange(clean(r));
        } else {
          onblur && onblur();
        }
      }, 0);
    }
  };
  return (
    <form {...otherProps} class="notecard" onsubmit={onsubmit}>
      <input type="text" key="title" name="title" value={title} {...handlers} />
      <textarea
        rows={10}
        key="ingrediants"
        name="ingrediants"
        value={ingrediants}
        {...handlers}
      />
      <textarea
        rows={10}
        key="directions"
        name="directions"
        value={directions}
        {...handlers}
      />
    </form>
  );
}

let ctrlDown = false;
const ctrlKey = 17,
  cmdKey = 91,
  sKey = 83;

function onkeydown(e: any) {
  if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
  if (ctrlDown && e.keyCode == sKey) {
    e.preventDefault();
    e.target.blur();
  }
}
function onkeyup(e: any) {
  if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
}

function onsubmit(e: any) {
  e.preventDefault();
  e.target.children[0].focus();
  e.target.children[0].blur();
}

function clean(r: Recipe): Recipe {
  return {
    title: r.title.trim(),
    ingrediants: trimlines(r.ingrediants),
    directions: trimlines(r.directions)
  };
}

function trimlines(s: string) {
  return s
    .split("\n")
    .map(s => s.trim())
    .filter(s => s !== "")
    .slice(0, 10)
    .join("\n");
}

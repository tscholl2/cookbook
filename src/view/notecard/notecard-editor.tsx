import * as Superfine from "superfine";
import "./style.scss";
import { Recipe } from "../../model";

export interface NotecardProps {
  recipe: Recipe;
  onSubmit?(e: any, r: Recipe, err?: string): void;
  onCancel?(e: any): void;
  error?: string;
  disabled?: boolean;
}

export function NotecardEditor(props: NotecardProps) {
  const {
    recipe: { title = "", ingrediants = [], directions = [] },
    onSubmit,
    onCancel,
    disabled,
    error,
    ...otherProps
  } = props;
  return (
    <form
      {...otherProps}
      data-error={error || ""}
      class="notecard notecard-editor"
    >
      <button onclick={onCancel} disabled={disabled} type="button">
        ❌
      </button>
      <h1>
        <input
          id="title-input"
          type="text"
          placeholder="Title"
          value={title}
          disabled={disabled}
          required="true"
        />
      </h1>
      <textarea
        id="ingrediants-input"
        rows="10"
        placeholder={"1 carrot\n2 avacados\n..."}
        value={ingrediants.join("\n")}
        disabled={disabled}
        required="true"
      />
      <textarea
        id="directions-input"
        rows="10"
        placeholder={"mix\nbake\n..."}
        value={directions.join("\n")}
        disabled={disabled}
        required="true"
      />
      <button
        onclick={(e: any) => {
          let r: Recipe = {
            title: (document.getElementById("title-input") as any).value || "",
            ingrediants: (
              (document.getElementById("ingrediants-input") as any).value || ""
            )
              .split("\n")
              .filter((x: any) => x),
            directions: (
              (document.getElementById("directions-input") as any).value || ""
            )
              .split("\n")
              .filter((x: any) => x)
          };
          let err: string | undefined;
          if (r.title == "") {
            err = "a title is required";
          } else if (r.directions.length == 0) {
            err = "directions are required";
          } else if (r.ingrediants.length == 0) {
            err = "ingrediants are required";
          }
          if (onSubmit) onSubmit(e, r, err);
        }}
        disabled={disabled}
        type="button"
      >
        ✔️
      </button>
    </form>
  );
}

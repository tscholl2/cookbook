import * as Superfine from "superfine";
import "./style.scss";
import { Recipe } from "../../model";

export interface NotecardProps {
  recipe: Recipe;
  onchange?(r: Recipe): void;
  oncancel?(): void;
  error?: string;
  disabled?: boolean;
}

export function NotecardEditor(props: NotecardProps) {
  const {
    recipe: { title = "", ingrediants = [], directions = [] },
    onchange,
    oncancel,
    disabled,
    error,
    ...otherProps
  } = props;
  return (
    <div
      {...otherProps}
      data-error={error || ""}
      class="notecard notecard-editor"
    >
      <h1>
        <button
          onclick={() => {
            //if (onchange) onchange(r);
          }}
          disabled={disabled}
        >
          ✔️
        </button>
        <input
          id="title-input"
          type="text"
          placeholder="Title"
          value={title}
          disabled={disabled}
        />
        <button onclick={oncancel} disabled={disabled}>
          ❌
        </button>
      </h1>
      <textarea
        id="ingrediants-input"
        rows="10"
        placeholder={"1 carrot\n2 avacados\n..."}
        value={ingrediants.join("\n")}
        disabled={disabled}
      />
      <textarea
        id="directions-input"
        rows="10"
        placeholder={"mix\nbake\n..."}
        value={directions.join("\n")}
        disabled={disabled}
      />
    </div>
  );
}

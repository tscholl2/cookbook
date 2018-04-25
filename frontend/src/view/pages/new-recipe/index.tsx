import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { createFormSelector } from "src/model/selectors";
import { FormStatus, FormErrors } from "src/model/forms";
import { parseIngrediant } from "src/utils/parse-ingrediant";
import { RecipeInput } from "./types";
import { Preview } from "./preview";

export function NewRecipePage(dispatch: Dispatch<State>) {
  const formSelector = createFormSelector<RecipeInput>(
    "new-recipe",
    {
      name: "",
      directions: "",
      ingrediants: "",
      author: "",
    },
    { validate },
  )(dispatch);
  const autoFocus = (el: HTMLElement) => el.focus();
  return (state: State) => {
    const { values, errors, handleSubmit, handleChange, handleBlur, handleFocus } = formSelector(
      state,
    );
    const inputProps = { oninput: handleChange, onblur: handleBlur, onfocus: handleFocus };
    return (
      <div>
        <h2>Add a new Recipe</h2>
        <form onsubmit={handleSubmit}>
          <fieldset>
            <legend>New Recipe</legend>
            <label>
              Name
              <input
                required={true}
                oncreate={autoFocus}
                type="text"
                name="name"
                placeholder="cooked brocolli"
                value={values.name}
                {...inputProps}
              />
            </label>
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            <br />
            <label>
              Servings
              <input
                required={true}
                type="number"
                name="servings"
                placeholder="servings"
                value={values.servings}
                {...inputProps}
              />
            </label>
            {errors.servings && <p style={{ color: "red" }}>{errors.servings}</p>}
            <br />
            <label>
              Ingrediants
              <textarea
                required={true}
                name="ingrediants"
                placeholder={"1/2 cup brocolli\n1 tsp salt"}
                value={values.ingrediants}
                {...inputProps}
              />
            </label>
            {errors.ingrediants && <p style={{ color: "red" }}>{errors.ingrediants}</p>}
            <br />
            <label>
              Directions
              <textarea
                required={true}
                name="directions"
                placeholder={"1. cut broccoli\n2. cook broccoli"}
                value={values.directions}
                {...inputProps}
              />
            </label>
            {errors.directions && <p style={{ color: "red" }}>{errors.directions}</p>}
            <br />
            <label>
              Author
              <input
                required={true}
                type="text"
                name="author"
                placeholder="author"
                value={values.author}
                {...inputProps}
              />
            </label>
            {errors.author && <p style={{ color: "red" }}>{errors.author}</p>}
            <br />
            <button type="submit" disabled={hasError(errors)}>
              submit
            </button>
          </fieldset>
        </form>
        <Preview {...values} />
      </div>
    );
  };
}

function validate(status: FormStatus<RecipeInput>): FormErrors<RecipeInput> {
  const errors: FormErrors<RecipeInput> = {};
  if (!status.values.author) {
    errors.author = "required";
  }
  if (!status.values.name) {
    errors.name = "required";
  }
  if (!status.values.directions) {
    errors.directions = "required";
  }
  if (status.values.servings == null) {
    errors.servings = "required";
  } else if (status.values.servings <= 0) {
    errors.servings = "must be > 0";
  }
  if (!status.values.ingrediants) {
    errors.ingrediants = "required";
  } else {
    const lines = status.values.ingrediants.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      try {
        parseIngrediant(line);
      } catch (e) {
        errors.ingrediants = `unkown ingrediant on line ${i + 1}: ${e}`;
        break;
      }
    }
  }
  return errors;
}

function hasError(errors: FormErrors<any>) {
  for (let k in errors) {
    if (errors[k]) {
      return true;
    }
  }
  return false;
}

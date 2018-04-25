import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { actionsCreator } from "src/model/actions";
import { FormStatus, FormErrors, FormTouched } from "src/model/forms";
import { parseIngrediant } from "src/utils/parse-ingrediant";
import { RecipeInput } from "./types";
import { Preview } from "./preview";

export function NewRecipePage(dispatch: Dispatch<State>) {
  const actions = actionsCreator(dispatch);
  const formSelector = actions.forms.newSelectFormProps<RecipeInput>(
    "new-recipe",
    { name: "", directions: "", ingrediants: "", author: "" },
    { validate },
  );
  const autoFocus = (el: HTMLElement) => el.focus();
  return (state: State) => {
    const {
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      handleBlur,
      handleFocus,
    } = formSelector(state.forms);
    const inputProps = { oninput: handleChange, onblur: handleBlur, onfocus: handleFocus };
    return (
      <div>
        <h2>Add a new Recipe</h2>
        <form onsubmit={handleSubmit}>
          <fieldset>
            <legend>New Recipe</legend>
            <div class={"form-group" + errors.name ? " has-error" : ""}>
              <label class="form-label" for="input-recipe.name">
                Name
              </label>
              <input
                class="form-input"
                id="input-recipe.name"
                required={true}
                oncreate={autoFocus}
                type="text"
                name="name"
                placeholder="cooked brocolli"
                value={values.name}
                {...inputProps}
              />
              {errors.name && <p class="form-input-hint">{errors.name}</p>}
            </div>
            <div class={"form-group" + errors.servings ? " has-error" : ""}>
              <label class="form-label" for="input-recipe.servings">
                Servings
              </label>
              <input
                class="form-input"
                id="input-recipe.servings"
                required={true}
                oncreate={autoFocus}
                type="text"
                name="name"
                placeholder="cooked brocolli"
                value={values.servings}
                {...inputProps}
              />
              {errors.servings && <p class="form-input-hint">{errors.servings}</p>}
            </div>
            <div class={"form-group" + errors.ingrediants ? " has-error" : ""}>
              <label class="form-label" for="input-recipe.ingrediants">
                Ingrediants
              </label>
              <textarea
                class="form-input"
                id="input-recipe.ingrediants"
                required={true}
                oncreate={autoFocus}
                name="ingrediants"
                placeholder={"1/2 cup brocolli\n1 tsp salt"}
                value={values.ingrediants}
                {...inputProps}
              />
              {errors.ingrediants && <p class="form-input-hint">{errors.ingrediants}</p>}
            </div>
            <div class={"form-group" + errors.directions ? " has-error" : ""}>
              <label class="form-label" for="input-recipe.directions">
                Directions
              </label>
              <textarea
                class="form-input"
                id="input-recipe.directions"
                required={true}
                oncreate={autoFocus}
                name="directions"
                placeholder={"1. preheat oven\n2. cook brocoli"}
                value={values.directions}
                {...inputProps}
              />
              {errors.directions && <p class="form-input-hint">{errors.directions}</p>}
            </div>
            <div class={"form-group" + (errors.author && hasTouched(touched)) ? " has-error" : ""}>
              <label class="form-label" for="input-recipe.author">
                Name
              </label>
              <input
                class="form-input"
                id="input-recipe.author"
                required={true}
                oncreate={autoFocus}
                type="text"
                name="author"
                placeholder="author"
                value={values.author}
                {...inputProps}
              />
              {errors.author && <p class="form-input-hint">{errors.ingrediants}</p>}
            </div>
            <button type="submit" disabled={hasError(errors) || !hasTouched(touched)}>
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

function hasTouched(touched: FormTouched<any>) {
  return hasError(touched as any);
}

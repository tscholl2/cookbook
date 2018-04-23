import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { createFormSelector } from "src/model/selectors";
import { FormStatus, FormErrors } from "src/model/forms";
import { parseIngrediant } from "src/utils/parse-ingrediant";

interface RecipeInput {
  name: string;
  directions: string;
  ingrediants: string;
  servings?: number;
  author: string;
}

export const NewRecipePage = (dispatch: Dispatch<State>) => {
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
    const {
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      handleBlur,
      handleFocus,
    } = formSelector(state);
    const inputProps = { onchange: handleChange, onblur: handleBlur, onfocus: handleFocus };
    return (
      <div>
        <h2>Add a new Recipe</h2>
        <form onsubmit={handleSubmit}>
          <input
            required={true}
            oncreate={autoFocus}
            type="text"
            name="name"
            placeholder="cooked brocolli"
            value={values.name}
            {...inputProps}
          />
          {touched.name && errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          <br />
          <textarea
            required={true}
            name="ingrediants"
            placeholder={"1/2 cup brocolli\n1 tsp salt"}
            value={values.ingrediants}
            {...inputProps}
          />
          {touched.ingrediants &&
            errors.ingrediants && <p style={{ color: "red" }}>{errors.ingrediants}</p>}
          <br />
          <textarea
            required={true}
            name="directions"
            placeholder={"1. cut broccoli\n2. cook broccoli"}
            value={values.directions}
            {...inputProps}
          />
          {touched.directions &&
            errors.directions && <p style={{ color: "red" }}>{errors.directions}</p>}
          <br />
          <input
            required={true}
            type="number"
            name="servings"
            placeholder="servings"
            value={values.servings}
            {...inputProps}
          />
          {touched.servings && errors.servings && <p style={{ color: "red" }}>{errors.servings}</p>}
          <br />
          <input
            required={true}
            type="text"
            name="author"
            placeholder="author"
            value={values.author}
            {...inputProps}
          />
          {touched.author && errors.author && <p style={{ color: "red" }}>{errors.author}</p>}
          <br />
          <button type="submit" disabled={hasError(errors)}>
            submit
          </button>
        </form>
      </div>
    );
  };
};

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

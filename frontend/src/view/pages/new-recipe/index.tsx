import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { actionsCreator } from "src/model/actions";
import { FormStatus, FormErrors, FormTouched } from "src/model/forms";
import { Preview } from "./preview";
import { parse } from "./parse";

export function NewRecipePage(dispatch: Dispatch<State>) {
  const actions = actionsCreator(dispatch);
  const formSelector = actions.forms.newSelectFormProps<{ rtext: string }>(
    "new-recipe-text",
    { rtext: "" },
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
            <div class={"form-group" + errors.rtext ? " has-error" : ""}>
              <label class="form-label" for="input-recipe.rtext">
                Recipe
              </label>
              <textarea
                class="form-input"
                id="input-recipe.rtext"
                required={true}
                oncreate={autoFocus}
                name="rtext"
                placeholder={"recipe here"}
                value={values.rtext}
                {...inputProps}
              />
              {errors.rtext && <p class="form-input-hint">{errors.rtext}</p>}
            </div>
          </fieldset>
          <button type="submit" disabled={hasError(errors) || !hasTouched(touched)}>
            submit
          </button>
        </form>
        <Preview text={values.rtext} />
      </div>
    );
  };
}

function validate(status: FormStatus<{ rtext: string }>): FormErrors<{ rtext: string }> {
  try {
    parse(status.values.rtext);
    return {};
  } catch (e) {
    return { rtext: `${e}` };
  }
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

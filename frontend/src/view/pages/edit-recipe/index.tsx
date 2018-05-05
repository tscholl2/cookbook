import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { actionsCreator } from "src/model/actions";
import { FormStatus, FormErrors, FormProps } from "src/model/forms";
import { parseIngrediant } from "src/utils/parse-ingrediant";
import {
  RecipeFormValues,
  formValuesToRecipe,
  recipeToFormValues,
} from "src/utils/recipe-form-values";
import { Preview } from "./preview";
import { RecipeForm } from "./form";
import "./style.scss";

export function EditRecipePage(dispatch: Dispatch<State>) {
  const actions = actionsCreator(dispatch);
  const formSelectorCache: {
    [key: string]: undefined | ((state: State["forms"]) => FormProps<RecipeFormValues>);
  } = {};
  // TODO: initialValue should
  function getFormSelector(
    recipeID = "",
    initialValue: RecipeFormValues, // TODO: the initial value should be set from using dispatch to getState
  ): (state: State["forms"]) => FormProps<RecipeFormValues> {
    const name = `edit-recipe-${recipeID}`;
    if (formSelectorCache[name] !== undefined) {
      return formSelectorCache[name]!;
    }
    formSelectorCache[name] = actions.forms.newSelectFormProps<RecipeFormValues>(
      name,
      initialValue,
      {
        validate,
        onSubmit: async status => {
          const recipe = formValuesToRecipe(status.values);
          await actions.api.submitNewRecipe(recipe); // TODO: this returns the recipe so can use to nav
          formSelectorCache[name] = undefined; // needs to be clared so that the initial value is updated next edit
          // TODO: signal UI when done to show modal & redirect on success?
          return actions.forms.clearForm(name);
        },
      },
    );
    return formSelectorCache[name]!;
  }
  return (state: State) => {
    const recipeID = state.route.data.recipeID || "";
    const initialValues = state.api.data.recipes[recipeID]
      ? recipeToFormValues(state.api.data.recipes[recipeID])
      : {
          id: "",
          name: "",
          directions: "",
          ingrediants: "",
          author: "",
          time: "",
          tags: "",
          images: [],
        };
    const formSelector = getFormSelector(state.route.data.recipeID, initialValues);
    const formProps = formSelector(state.forms);
    return (
      <main class="cookbook-editor-container">
        <div class="columns">
          <div class="column col-6 col-md-12">
            <h2 style={{ textAlign: "center" }}>Recipe</h2>
            <RecipeForm {...formProps} />
          </div>
          <div class="divider-vert" />
          <div class="column col-5 col-md-12">
            <h2 style={{ textAlign: "center" }}>Preview</h2>
            <Preview {...formProps.values} />
          </div>
        </div>
      </main>
    );
  };
}

const number = "\\d+(?:\\.\\d*)?";
const fraction = `${number}(?:\\/${number})?`;
const reTime = new RegExp(fraction + "\\s*" + "[a-zA-Z]+");
function validate(status: FormStatus<RecipeFormValues>): FormErrors<RecipeFormValues> {
  const errors: FormErrors<RecipeFormValues> = {};
  if (!status.values.author) {
    errors.author = "required";
  }
  if (!status.values.name) {
    errors.name = "required";
  }
  if (!status.values.directions) {
    errors.directions = "required";
  }
  if (!status.values.time) {
    errors.time = "required";
  } else if (!reTime.test(status.values.time)) {
    errors.time = "please enter a time like '1 hr' (number unit)";
  }
  if (status.values.servings == null) {
    errors.servings = "required";
  } else if (status.values.servings <= 0) {
    errors.servings = "must be a number > 0";
  }
  if (!status.values.ingrediants) {
    errors.ingrediants = "required";
  } else {
    const lines = status.values.ingrediants.split("\n");
    if (lines.length === 0) {
      errors.ingrediants = "must include ≥1 ingrediant";
    } else {
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
  }
  return errors;
}

import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { actionsCreator } from "src/model/actions";
import { FormStatus, FormErrors } from "src/model/forms";
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
  const formSelector = actions.forms.newSelectFormProps<RecipeFormValues>(
    "new-recipe",
    {
      id: "",
      name: "",
      directions: "",
      ingrediants: "",
      author: "",
      time: "",
      tags: "",
      images: [],
    },
    {
      validate,
      onSubmit: async status => {
        const recipe = formValuesToRecipe(status.values);
        await actions.api.submitNewRecipe(recipe); // TODO: this returns the recipe so can use to nav
        // TODO: signal UI when done to show modal & redirect on success?
        return actions.forms.clearForm("new-recipe");
      },
    },
  );
  const initializeForm = (state: State) => {
    // TODO: maybe use a UI state value to track whether this field is disabled/loading
    // TODO: memoize with createSelector
    const formProps = formSelector(state.forms);
    const formID = formProps.values.id || "";
    const routeID = state.route.data.recipeID || "";
    // If the current props don't match the route, we need to update the form
    // TODO: this would be better if we:
    // - used a new "form name" for each recipe + the new recipe
    // - used a separate page for editing current recipes vs new recipes
    if (formID !== routeID) {
      if (routeID !== "") {
        const recipe = state.api.data.recipes[routeID];
        if (recipe !== undefined) {
          actions.forms.setForm("new-recipe", recipeToFormValues(recipe));
        } else {
          if (
            !state.api.status.allRecipes.isLoading &&
            state.api.status.allRecipes.timestamp === undefined
          ) {
            formProps.handleReset();
            formProps.handleChange({ target: { name: "id", value: routeID } } as any);
            actions.api.downloadAllRecipes().then(() => actions.forms.clearForm("new-recipe"));
          }
        }
      } else {
        actions.forms.clearForm("new-recipe");
      }
    }
  };
  return (state: State) => {
    const formProps = formSelector(state.forms);
    const isLoading = state.api.status.allRecipes.isLoading;
    return (
      <main
        oncreate={initializeForm(state)}
        onupdate={initializeForm(state)}
        class="cookbook-editor-container"
      >
        <div class="columns">
          <div class="column col-6 col-md-12">
            <h2 style={{ textAlign: "center" }}>Recipe</h2>
            <RecipeForm disabled={isLoading} {...formProps} />
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
    errors.time = "invalid time format";
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

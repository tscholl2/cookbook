import * as View from "../../h";
import { State } from "../../../model";
import { Dispatch } from "../../../controller";
import { actionsCreator } from "../../../model/actions";
import { FormStatus, FormErrors, FormProps } from "../../../model/forms";
import { parseIngrediant } from "../../../utils/parse-ingrediant";
import { parseDirections } from "../../../utils/parse-directions";
import {
  RecipeFormValues,
  formValuesToRecipe,
  recipeToFormValues,
} from "src/utils/recipe-form-values";
import { Preview } from "./preview";
import { RecipeForm } from "./form";
import { ResponseModal } from "./response-modal";
import { Recipe } from "src/api";
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
          let recipe: Recipe | void = formValuesToRecipe(status.values);
          recipe = await actions.api.submitNewRecipe(recipe);
          if (recipe != null) {
            formSelectorCache[name] = undefined; // needs to be clared so that the initial value is updated next edit
            actions.ui.setIn(["edit-recipe-response"], { success: true, recipeID: recipe.id });
          } else {
            actions.ui.setIn(["edit-recipe-response"], { success: false });
          }
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
    let modal: any;
    if (state.ui["edit-recipe-response"]) {
      const props = state.ui["edit-recipe-response"] || {};
      modal = (
        <ResponseModal
          onClose={() => actions.ui.setIn(["edit-recipe-response"], undefined)}
          onView={() => {
            actions.ui.setIn(["edit-recipe-response"], undefined);
            actions.router.goToRecipe(props.recipeID);
          }}
          success={props.success}
        />
      );
    }
    return (
      <main class="cookbook-editor-container">
        <div class="columns">
          <div class="column col-6 col-md-12">
            <h2 style="text-align:center;">Recipe</h2>
            <RecipeForm {...formProps} />
          </div>
          <div class="divider-vert" />
          <div class="column col-5 col-md-12">
            <h2 style="text-align:center;">Preview</h2>
            <Preview {...formProps.values} />
          </div>
        </div>
        {modal}
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
  } else {
    try {
      parseDirections(status.values.directions);
    } catch (e) {
      errors.directions = `${e}`;
    }
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

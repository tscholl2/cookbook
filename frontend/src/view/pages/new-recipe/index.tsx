import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { actionsCreator } from "src/model/actions";
import { FormStatus, FormErrors } from "src/model/forms";
import { parseIngrediant } from "src/utils/parse-ingrediant";
import { RecipeInput, inputToRecipe } from "./types";
import { Preview } from "./preview";
import { RecipeForm } from "./form";
import "./style.scss";

export function NewRecipePage(dispatch: Dispatch<State>) {
  const actions = actionsCreator(dispatch);
  const formSelector = actions.forms.newSelectFormProps<RecipeInput>(
    "new-recipe",
    { name: "", directions: "", ingrediants: "", author: "", time: "" },
    {
      validate,
      onSubmit: status => {
        const recipe = inputToRecipe(status.values);
        // TODO: signal UI when done to show modal & redirect on success?
        return actions.api.submitNewRecipe(recipe);
      },
    },
  );
  return (state: State) => {
    const formProps = formSelector(state.forms);
    return (
      <div class="cookbook-editor-container">
        <RecipeForm {...formProps} />
        <Preview {...formProps.values} />
      </div>
    );
  };
}

const number = "\\d+(?:\\.\\d*)?";
const fraction = `${number}(?:\\/${number})?`;
const reTime = new RegExp(fraction + "\\s*" + "[a-zA-Z]+");
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

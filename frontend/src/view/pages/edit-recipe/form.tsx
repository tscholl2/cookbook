import { h } from "src/view/h";
import { RecipeFormValues } from "src/utils/recipe-form-values";
import { FormProps, FormErrors, FormTouched } from "src/model/forms";

const autoFocus = (el: HTMLElement) => el.focus();

export function RecipeForm(props: FormProps<RecipeFormValues> & { disabled?: boolean }) {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    handleFocus,
    isSubmitting,
    disabled,
  } = props;
  const inputProps = { oninput: handleChange, onblur: handleBlur, onfocus: handleFocus };
  const someError = hasError(errors);
  const someTouched = hasTouched(touched);
  const removeImage = (index: number) =>
    handleChange({
      target: { name: "images", value: values.images.filter((_, i) => i !== index) },
    } as any);
  return (
    <form class="form-horizontal" onsubmit={handleSubmit}>
      <fieldset disabled={isSubmitting || disabled}>
        <legend>New Recipe</legend>
        <div class={"form-group" + (someTouched && errors.name ? " has-error" : "")}>
          <div class="col-3 col-sm-12">
            <label class="form-label" for="input-recipe.name">
              Name
            </label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              oncreate={autoFocus}
              class="form-input"
              id="input-recipe.name"
              required={true}
              type="text"
              name="name"
              placeholder="cooked brocolli"
              value={values.name}
              {...inputProps}
            />
            {errors.name && someTouched && <p class="form-input-hint">{errors.name}</p>}
          </div>
        </div>
        <div class={"form-group" + (someTouched && errors.time ? " has-error" : "")}>
          <div class="col-3 col-sm-12">
            <label class="form-label" for="input-recipe.time">
              Time
            </label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              class="form-input"
              id="input-recipe.time"
              required={true}
              type="text"
              name="time"
              placeholder="1 hr"
              value={values.time}
              {...inputProps}
            />
            {errors.time && someTouched && <p class="form-input-hint">{errors.time}</p>}
          </div>
        </div>
        <div class={"form-group" + (someTouched && errors.servings ? " has-error" : "")}>
          <div class="col-3 col-sm-12">
            <label class="form-label" for="input-recipe.servings">
              Servings
            </label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              class="form-input"
              id="input-recipe.servings"
              required={true}
              type="number"
              name="servings"
              placeholder="1"
              value={values.servings}
              {...inputProps}
              onChange={handleChange}
            />
            {errors.servings && someTouched && <p class="form-input-hint">{errors.servings}</p>}
          </div>
        </div>
        <div class={"form-group" + (someTouched && errors.tags ? " has-error" : "")}>
          <div class="col-3 col-sm-12">
            <label class="form-label" for="input-recipe.tags">
              Tags
            </label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              class="form-input"
              id="input-recipe.tags"
              type="text"
              name="tags"
              placeholder="breakfast, hearty"
              value={values.tags}
              {...inputProps}
            />
            {errors.tags && someTouched && <p class="form-input-hint">{errors.tags}</p>}
          </div>
        </div>
        <div class={"form-group" + (someTouched && errors.ingrediants ? " has-error" : "")}>
          <div class="col-3 col-sm-12">
            <label class="form-label" for="input-recipe.ingrediants">
              Ingrediants
            </label>
          </div>
          <div class="col-9 col-sm-12">
            <textarea
              class="form-input"
              id="input-recipe.ingrediants"
              required={true}
              name="ingrediants"
              placeholder={"1/2 cup brocolli\n1 tsp salt"}
              value={values.ingrediants}
              {...inputProps}
            />
            {errors.ingrediants &&
              someTouched && <p class="form-input-hint">{errors.ingrediants}</p>}
          </div>
        </div>
        <div class={"form-group" + (someTouched && errors.directions ? " has-error" : "")}>
          <div class="col-3 col-sm-12">
            <label class="form-label" for="input-recipe.directions">
              Directions
            </label>
          </div>
          <div class="col-9 col-sm-12">
            <textarea
              class="form-input"
              id="input-recipe.directions"
              required={true}
              name="directions"
              placeholder={"1. preheat oven\n2. cook brocoli"}
              value={values.directions}
              {...inputProps}
            />
            {errors.directions && someTouched && <p class="form-input-hint">{errors.directions}</p>}
          </div>
        </div>
        <div class={"form-group" + (errors.author && hasTouched(touched) ? " has-error" : "")}>
          <div class="col-3 col-sm-12">
            <label class="form-label" for="input-recipe.author">
              Author
            </label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              class="form-input"
              id="input-recipe.author"
              required={true}
              type="text"
              name="author"
              placeholder="author"
              value={values.author}
              {...inputProps}
            />
            {errors.author && someTouched && <p class="form-input-hint">{errors.author}</p>}
          </div>
        </div>
        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label">Images</label>
          </div>
          <div class="col-9 col-sm-12">
            <ul class="cookbook-new-recipe-form-image-list">
              {values.images.map((s, i) => (
                <li>
                  <img src={s} />
                  <button
                    type="button"
                    class="cookbook-top-right btn btn-action circle"
                    onclick={() => removeImage(i)}
                  >
                    ×
                  </button>
                </li>
              ))}
              <li>
                <button type="button" class="btn">
                  Add Image
                </button>
              </li>
            </ul>
          </div>
        </div>
        <button
          class={"btn active" + (isSubmitting ? " loading" : "")}
          type="submit"
          disabled={isSubmitting || someError || !someTouched || disabled}
        >
          submit
        </button>
      </fieldset>
    </form>
  );
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
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
  const handleNewImageFile = (file: File | string | undefined) => {
    if (file === undefined) {
      return;
    }
    if (typeof file === "string") {
      return handleChange({
        target: { name: "images", value: values.images.concat([file]) },
      } as any);
    }
    const reader = new FileReader();
    reader.onload = (e: FileReaderProgressEvent) =>
      handleChange({
        target: { name: "images", value: values.images.concat([e.target!.result]) },
      } as any);
    reader.readAsDataURL(file);
  };
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
          <div
            class="col-9 col-sm-12"
            tabindex={0}
            onfocus={(e: any) => {
              const selection = window.getSelection();
              selection.removeAllRanges();
              const el = document.getElementById("hidden-selectable")!;
              const range = document.createRange();
              range.selectNodeContents(el);
              selection.addRange(range);
              if (e.target !== document.activeElement) {
                e.target.focus();
              }
            }}
            onpaste={(e: any) => handleNewImageFile(handleFilePasteEvent(e))}
          >
            <p id="hidden-selectable" style="position:absolute;left:-1000px;">
              aaa
            </p>
            <ul
              class="cookbook-new-recipe-form-image-list"
              ondragenter={(e: any) => e.target.classList.add("cookbook-dragging")}
              ondragover={cancelEvent}
              ondragleave={(e: any) => e.target.classList.remove("cookbook-dragging")}
              ondrop={(e: any) => {
                handleNewImageFile(handleFileDropEvent(e));
                e.target.classList.remove("cookbook-dragging");
              }}
            >
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
                <input
                  type="file"
                  id="fileInputElement"
                  accept="image/*"
                  style="display:none;"
                  onchange={(e: any) => handleNewImageFile(handleFileInputEvent(e))}
                />
                <button
                  type="button"
                  class="btn cookbook-add-image-button"
                  onclick={() => document.getElementById("fileInputElement")!.click()}
                />
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

function cancelEvent(e: Event) {
  e.stopPropagation();
  e.preventDefault();
}

function handleFileInputEvent(e: any): File | undefined {
  e.preventDefault();
  const files: FileList = e.target.files;
  if (files.length > 0 && files[0].type.startsWith("image/")) {
    return files[0];
  }
}

function handleFileDropEvent(e: DragEvent): File | string | undefined {
  e.preventDefault();
  const items = e.dataTransfer.files;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.startsWith("image/")) {
      return items[i];
    }
  }
  const text = e.dataTransfer.getData("text") || "";
  if (text.startsWith("http")) {
    return text;
  }
}

function handleFilePasteEvent(e: ClipboardEvent): File | string | undefined {
  e.preventDefault();
  const items: DataTransferItemList = e.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.startsWith("image/")) {
      return items[i].getAsFile()!;
    }
  }
  const text = e.clipboardData.getData("text") || "";
  if (text.startsWith("http")) {
    return text;
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

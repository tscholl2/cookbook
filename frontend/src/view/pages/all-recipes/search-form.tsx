import { h } from "src/view/h";
import { FormProps } from "src/model/forms";

export interface SearchFormValues {
  search: string;
  tags: string;
  numberOfIngrediants?: number;
  ingrediants: string;
}

export const initialValues: SearchFormValues = {
  search: "",
  tags: "",
  numberOfIngrediants: undefined,
  ingrediants: "",
};

export function SearchForm(props: FormProps<SearchFormValues>) {
  return (
    <form onsubmit={props.handleSubmit}>
      <fieldset>
        <legend>Search</legend>
        <div class="form-group">
          <label class="form-label" for="input-search">
            Contains
          </label>
          <input
            id="input-search"
            class="form-input"
            name="search"
            type="search"
            placeholder="chop"
            value={props.values.search}
            oninput={props.handleChange}
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="input-tags">
            Tags
          </label>
          <input
            id="input-tags"
            class="form-input"
            name="tags"
            type="text"
            placeholder="tag1, tag2"
            value={props.values.tags}
            oninput={props.handleChange}
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="input-numberOfIngrediants">
            Number of Ingrediants
          </label>
          <input
            id="input-numberOfIngrediants"
            class="form-input"
            name="numberOfIngrediants"
            type="number"
            placeholder="3"
            value={props.values.numberOfIngrediants}
            oninput={props.handleChange}
          />
        </div>
        <div>
          <label class="form-label" for="input-ingredients">
            Ingrediants
          </label>
          <input
            id="input-ingredients"
            class="form-input"
            name="ingrediants"
            type="text"
            placeholder="cheese, bread"
            value={props.values.ingrediants}
            oninput={props.handleChange}
          />
        </div>
      </fieldset>
    </form>
  );
}

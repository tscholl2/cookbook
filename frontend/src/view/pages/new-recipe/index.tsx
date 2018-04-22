import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { createFormSelector } from "src/model/selectors";

export const NewRecipePage = (dispatch: Dispatch<State>) => {
  const formSelector = createFormSelector(
    "new-recipe",
    {
      name: "",
      directions: "",
      ingrediants: "",
      servings: undefined as number | undefined,
      author: "",
    },
    {
      validate: status => {
        return {
          name: status.values.name === "" ? "required" : undefined,
        };
      },
    },
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
            name="ingrediants"
            placeholder={"1/2 cup brocolli\n1 tsp salt"}
            value={values.ingrediants}
            {...inputProps}
          />
          {touched.ingrediants &&
            errors.ingrediants && <p style={{ color: "red" }}>{errors.ingrediants}</p>}
          <br />
          <textarea
            name="directions"
            placeholder={"1. cut broccoli\n2. cook broccoli"}
            value={values.directions}
            {...inputProps}
          />
          {touched.directions &&
            errors.directions && <p style={{ color: "red" }}>{errors.directions}</p>}
          <br />
          <input
            type="number"
            name="servings"
            placeholder="servings"
            value={values.servings}
            {...inputProps}
          />
          {touched.servings && errors.servings && <p style={{ color: "red" }}>{errors.servings}</p>}
          <br />
          <input
            type="text"
            name="author"
            placeholder="author"
            value={values.author}
            {...inputProps}
          />
          {touched.author && errors.author && <p style={{ color: "red" }}>{errors.author}</p>}
          <br />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  };
};

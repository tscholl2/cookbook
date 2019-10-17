import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State } from "../../model";

export function Search(dispatch: Dispatch<State>) {
  const onChange = (e: any) => {
    e.preventDefault();
    dispatch(state => ({
      ...state,
      search: { ...state.search, [e.target.name]: e.target.value }
    }));
  };
  return function(state: State) {
    const { search } = state;
    return (
      <form key="search">
        <input
          name="value"
          value={search.value}
          oninput={onChange}
          placeHolder="search"
        />
        <label>
          Search in{" "}
          <select name="field" value={search.field} onchange={onChange}>
            <option value="">All</option>
            <option value="title">Title</option>
            <option value="ingrediants">Ingrediants</option>
          </select>
        </label>
      </form>
    );
  };
}

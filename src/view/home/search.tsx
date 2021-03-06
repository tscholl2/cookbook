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
  const onNew = () => {
    dispatch(state => ({
      ...state,
      editor: { ...state.editor, i: -1, value: undefined }
    }));
  };
  const onSubmit = (e: any) => e.preventDefault();
  return function (state: State) {
    const { search } = state;
    return (
      <form class="search" key="search" onsubmit={onSubmit}>
        <input
          name="value"
          value={search.value}
          oninput={onChange}
          placeHolder="🔍"
        />
        <button onclick={onNew} type="button">
          ➕
        </button>
      </form>
    );
  };
}

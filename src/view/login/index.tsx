import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State } from "../../model";
import { load } from "../../utils/api";

export function Login(dispatch: Dispatch<State>) {
  function onsubmit(e: any) {
    e.preventDefault();
    const form = document.getElementById("login-form") as HTMLFormElement;
    const values: any = {};
    for (let i = 0; i < form.elements.length; i++) {
      const item: any = form.elements.item(i)!;
      values[item.name] = item.value;
    }
    dispatch(state => ({ ...state, status: "logging in" }));
    setTimeout(async () => {
      const data = await load(values.username);
      // TODO: error handling
      dispatch(state => ({
        ...state,
        recipes: data,
        status: "logged in",
        user: values.username
      }));
    }, 500);
  }
  return function (_: State) {
    return (
      <main>
        <form id="login-form" onsubmit={onsubmit}>
          <label>
            Username:
            <input name="username" type="text" placeholder="hippotomus" />
          </label>
        </form>
      </main>
    );
  };
}

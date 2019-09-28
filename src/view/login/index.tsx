import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State } from "../../model";
import { load } from "../../utils/api";

export function Login(dispatch: Dispatch<State>) {
  function onsubmit(e: any) {
    e.preventDefault();
    const form = document.getElementById("login-form") as HTMLFormElement;
    const data: any = {};
    for (let i = 0; i < form.elements.length; i++) {
      const item: any = form.elements.item(i)!;
      data[item.name] = item.value;
    }
    dispatch(state => ({ ...state, status: "logging in" }));
    setTimeout(async () => {
      const recipes = await load(data.username);
      dispatch(state => ({
        ...state,
        recipes,
        status: "logged in",
        user: data.username
      }));
    }, 500);
  }
  return function(_: State) {
    return (
      <form id="login-form" onsubmit={onsubmit}>
        <label>
          Username:
          <input name="username" type="text" placeholder="hippotomus" />
        </label>
      </form>
    );
  };
}

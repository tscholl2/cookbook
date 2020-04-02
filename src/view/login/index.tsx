import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State } from "../../model";
import { load } from "../../utils/api";
import "./style.scss";

export function Login(dispatch: Dispatch<State>) {
  function onsubmit(e: any) {
    e.preventDefault();
    const form = document.getElementById("login-form") as HTMLFormElement;
    const values: any = {};
    for (let i = 0; i < form.elements.length; i++) {
      const item: any = form.elements.item(i)!;
      values[item.name] = item.value;
    }
    dispatch(state => ({
      ...state,
      status: "logging in",
      api: { ...state.api, status: "loading" }
    }));
    load(values.username)
      .then(recipes => {
        document.title = `Cookbook/${values.username}`;
        dispatch(s => ({
          ...s,
          status: "logged in",
          user: values.username,
          recipes
        }));
      })
      .catch(e => dispatch(s => ({ ...s, api: { ...s.api, error: `${e}` } })))
      .finally(() =>
        dispatch(s => ({ ...s, api: { ...s.api, status: undefined } }))
      );
  }
  return function (_: State) {
    return (
      <main class="login">
        <form id="login-form" onsubmit={onsubmit}>
          <input
            autofocus="true"
            name="username"
            type="text"
            placeholder="username"
          />
        </form>
      </main>
    );
  };
}

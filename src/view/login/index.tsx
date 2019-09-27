import * as Superfine from "superfine";
import { Dispatch } from "../../controller";
import { State } from "../../model";

export function Login(dispatch: Dispatch<State>) {
  function onsubmit(e: any) {
    e.preventDefault();
    const form = document.getElementById("login-form") as HTMLFormElement;
    const data: any = {};
    for (let i = 0; i < form.elements.length; i++) {
      const item: any = form.elements.item(i)!;
      data[item.name] = item.value;
    }
    dispatch(state => ({ ...state, status: "loading" }));
    alert(`logged in with ${JSON.stringify(data)}`);
    setTimeout(
      () =>
        dispatch(state => ({
          ...state,
          status: "loaded",
          user: data["username"]
        })),
      500
    );
  }
  return function(state: State) {
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

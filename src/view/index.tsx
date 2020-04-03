import * as Superfine from "superfine";
import { Dispatch } from "../controller";
import { State } from "../model";
import { Login } from "./login";
import { Home } from "./home";
import "./style.scss";

export function App(dispatch: Dispatch<State>) {
  const login = Login(dispatch);
  const home = Home(dispatch);
  return function (state: State) {
    let Screen;
    switch (state.status) {
      case "logged in":
        Screen = home(state);
        break;
      case "logging in":
        Screen = (
          <main>
            {state.api.error ? (
              <div style="display:flex;justify-content:center;align-items:center;flex-direction:column;height:100vh;">
                <p style="color:red;background:#fff;padding:10px;border:1px solid #000;border-radius:5px;">
                  Unable to load this username. It could be already used. Please
                  reload and try a new one. The error was:
                </p>
                <br />
                <code style="color:gray;background:#fff;padding:10px;border:1px solid #000;border-radius:5px;">
                  {state.api.error}
                </code>
              </div>
            ) : (
              <progress />
            )}
          </main>
        );
        break;
      case "not logged in":
        Screen = login(state);
        break;
    }
    return <div>{Screen}</div>;
  };
}

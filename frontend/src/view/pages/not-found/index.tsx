import { h } from "src/view/h";
import { Dispatch } from "src/controller";
import { State } from "src/model";
import { actionsCreator } from "src/model/actions";

export function NotFoundPage(dispatch: Dispatch<State>) {
  const actions = actionsCreator(dispatch);
  return function(state: State) {
    return (
      <main>
        <div class="empty">
          <div class="empty-icon">
            <span style="font-size:5em;">?</span>
          </div>
          <p class="empty-title h5">404: Page {JSON.stringify(state.route.path)} not found.</p>
          <p class="empty-subtitle">Click the button to return home.</p>
          <div class="empty-action">
            <button class="btn btn-primary" onclick={actions.router.goToHome}>
              Home
            </button>
          </div>
        </div>
      </main>
    );
  };
}

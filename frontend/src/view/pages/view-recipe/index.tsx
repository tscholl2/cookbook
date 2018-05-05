import { h } from "src/view/h";
import { State } from "src/model";
import { actionsCreator } from "src/model/actions";
import { Dispatch } from "src/controller";
import { createSelector } from "reselect";
import "./style.scss";
declare const require: any;
const empty = require("../all-recipes/empty-preview.svg"); // TODO: move to components/

export const ViewRecipePage = (dispatch: Dispatch<State>) => {
  const actions = actionsCreator(dispatch);
  return createSelector(
    (state: State) => state.api.data.recipes[state.route.data.recipeID],
    recipe => {
      if (recipe === undefined) {
        return (
          <div class="empty">
            <div class="empty-icon">
              <img src={empty} />
            </div>
            <p class="empty-title h5">404: recipe not found.</p>
            <p class="empty-subtitle">Click the button to add a recipe.</p>
            <div class="empty-action">
              <button class="btn btn-primary" onclick={actions.router.goToNew}>
                New Recipe
              </button>
            </div>
          </div>
        );
      }
      return (
        <main key="cookbook-view-recipe" class="cookbook-view-recipe">
          <h1>
            {recipe.name}
            <button
              onclick={() => actions.router.goToEdit(recipe.id)}
              class="cookbook-view-recipe-edit-button btn btn-action circle"
            >
              ✎
            </button>
          </h1>
          <img
            class="img-fit-contain"
            style={{ maxHeight: "450px", width: "100%" }}
            src={recipe.images[0] || "http://via.placeholder.com/350x150"}
            alt={recipe.name}
          />
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <div class="columns">
              {recipe.tags.length > 0 && (
                <div class="column col-12">
                  Tags: {recipe.tags.map(t => <span class="chip">{t}</span>)}
                </div>
              )}
              <div class="column col-6 col-xs-12">By {recipe.author}</div>
              <div class="column col-6 col-xs-12">Serves {recipe.servings}</div>
              <div class="column col-6 col-xs-12">Takes {recipe.totalTime}</div>
              <div class="column col-6 col-xs-12">
                Published {new Date(recipe.lastEdited).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column col-4 col-lg-12">
              <h2>Ingredients</h2>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Measurement</th>
                  </tr>
                </thead>
                <tbody>
                  {recipe.ingredients.map(i => (
                    <tr>
                      <td>{i.name}</td>
                      <td>{i.amount}</td>
                      <td>{i.measurement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="column col-8 col-lg-12">
              <h2>Directions</h2>
              <div class="timeline">
                {recipe.directions.map((d, i) => (
                  <div class="timeline-item" id={`timeline-step-${i}`}>
                    <div class="timeline-left">
                      <a class="timeline-icon" href={`#timeline-step-${i}`} />
                    </div>
                    <div class="timeline-content">
                      <div class="tile">
                        <div class="tile-content">
                          <p class="tile-subtitle">Step {i + 1}</p>
                          <p class="tile-title">{d}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      );
    },
  );
};

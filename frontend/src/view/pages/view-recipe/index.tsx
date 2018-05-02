import { h } from "src/view/h";
import { State } from "src/model";
import { Dispatch } from "src/controller";
import { createSelector } from "reselect";

export const ViewRecipePage = (_: Dispatch<State>) => {
  return createSelector(
    (state: State) => state.api.data.recipes[state.route.data.recipeID],
    recipe => {
      return (
        <main>
          <div class="cookbook-view-recipe">
            <h1>Recipe</h1>
            <div>{JSON.stringify(recipe)}</div>
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
        </main>
      );
    },
  );
};

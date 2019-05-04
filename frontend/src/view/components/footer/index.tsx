import * as View from "src/view/h";
import "./style.scss";
import { Dispatch } from "src/controller";
import { State } from "src/model";
import { actionsCreator } from "src/model/actions";

export function connectFooter(dispatch: Dispatch<State>) {
  const actions = actionsCreator(dispatch);
  const footer = (
    <footer class="cookbook-footer">
      <ul>
        <li>
          <a href="https://github.com/tscholl2/cookbook">
            <img
              alt="github"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxMDI0IiB3aWR0aD0iMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTEyIDBDMjI5LjI1IDAgMCAyMjkuMjUgMCA1MTJjMCAyMjYuMjUgMTQ2LjY4OCA0MTguMTI1IDM1MC4xNTYgNDg1LjgxMiAyNS41OTQgNC42ODggMzQuOTM4LTExLjEyNSAzNC45MzgtMjQuNjI1IDAtMTIuMTg4LTAuNDY5LTUyLjU2Mi0wLjcxOS05NS4zMTJDMjQyIDkwOC44MTIgMjExLjkwNiA4MTcuNSAyMTEuOTA2IDgxNy41Yy0yMy4zMTItNTkuMTI1LTU2Ljg0NC03NC44NzUtNTYuODQ0LTc0Ljg3NS00Ni41MzEtMzEuNzUgMy41My0zMS4xMjUgMy41My0zMS4xMjUgNTEuNDA2IDMuNTYyIDc4LjQ3IDUyLjc1IDc4LjQ3IDUyLjc1IDQ1LjY4OCA3OC4yNSAxMTkuODc1IDU1LjYyNSAxNDkgNDIuNSA0LjY1NC0zMyAxNy45MDQtNTUuNjI1IDMyLjUtNjguMzc1QzMwNC45MDYgNzI1LjQzOCAxODUuMzQ0IDY4MS41IDE4NS4zNDQgNDg1LjMxMmMwLTU1LjkzOCAxOS45NjktMTAxLjU2MiA1Mi42NTYtMTM3LjQwNi01LjIxOS0xMy0yMi44NDQtNjUuMDk0IDUuMDYyLTEzNS41NjIgMCAwIDQyLjkzOC0xMy43NSAxNDAuODEyIDUyLjUgNDAuODEyLTExLjQwNiA4NC41OTQtMTcuMDMxIDEyOC4xMjUtMTcuMjE5IDQzLjUgMC4xODggODcuMzEyIDUuODc1IDEyOC4xODggMTcuMjgxIDk3LjY4OC02Ni4zMTIgMTQwLjY4OC01Mi41IDE0MC42ODgtNTIuNSAyOCA3MC41MzEgMTAuMzc1IDEyMi41NjIgNS4xMjUgMTM1LjUgMzIuODEyIDM1Ljg0NCA1Mi42MjUgODEuNDY5IDUyLjYyNSAxMzcuNDA2IDAgMTk2LjY4OC0xMTkuNzUgMjQwLTIzMy44MTIgMjUyLjY4OCAxOC40MzggMTUuODc1IDM0Ljc1IDQ3IDM0Ljc1IDk0Ljc1IDAgNjguNDM4LTAuNjg4IDEyMy42MjUtMC42ODggMTQwLjUgMCAxMy42MjUgOS4zMTIgMjkuNTYyIDM1LjI1IDI0LjU2MkM4NzcuNDM4IDkzMCAxMDI0IDczOC4xMjUgMTAyNCA1MTIgMTAyNCAyMjkuMjUgNzk0Ljc1IDAgNTEyIDB6Ii8+PC9zdmc+"
            />
            <span>GitHub</span>
          </a>
        </li>
        <li>
          <a class="c-hand" onclick={actions.router.goToHome}>
            <span>🏠</span>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a class="c-hand" onclick={actions.router.goToAbout}>
            <span>?</span>
            <span>About</span>
          </a>
        </li>
      </ul>
      <img
        alt="logo"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii01MDAgLTUwMCA5NzAgODAwIj48ZyBpZD0iZ3JvdXAiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZT0iIzAwMCI+PGcgaWQ9ImVhcnMiIGZpbGw9IiNhMGQiPjxwYXRoIGlkPSJyaWdodC1lYXIiIGQ9Ik0yMDAtMTUwbDI1MC0yNTBhNTAgNTAgMCAwIDAtMTAwLTUweiIvPjxwYXRoIGlkPSJsZWZ0LWVhciIgZD0iTTIwMC0xNTBMLTUwLTQwMGE1MCA1MCAwIDAgMSAxMDAtNTB6Ii8+PC9nPjxjaXJjbGUgaWQ9InRhaWwiIGN4PSItNDQwIiByPSI1MCIgZmlsbD0iI2EwZCIvPjxnIGlkPSJsZWdzIiBzdHJva2Utd2lkdGg9IjMwIj48cGF0aCBpZD0iZnJvbnQtcmlnaHQtbGVnIiBkPSJNMjAwIDIwMHY3NSIvPjxwYXRoIGlkPSJmcm9udC1sZWZ0LWxlZyIgZD0iTTE1MCAyMDB2NzUiLz48cGF0aCBpZD0iYmFjay1yaWdodC1sZWciIGQ9Ik0tMTUwIDIwMHY3NSIvPjxwYXRoIGlkPSJiYWNrLWxlZnQtbGVnIiBkPSJNLTIwMCAyMDB2NzUiLz48L2c+PGVsbGlwc2UgaWQ9ImJvZHkiIHJ4PSI0MDAiIHJ5PSIyNTAiIGZpbGw9IiNhMGQiLz48ZyBpZD0iZXllcyI+PGNpcmNsZSBpZD0icmlnaHQtZXllIiBjeD0iMjU1IiBjeT0iLTEwMCIgcj0iNDUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGlkPSJyaWdodC1wdXBpbCIgY3g9IjI1NSIgY3k9Ii0xMDAiIHI9IjUiLz48Y2lyY2xlIGlkPSJsZWZ0LWV5ZSIgY3g9IjE0NSIgY3k9Ii0xMDAiIHI9IjQ1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBpZD0ibGVmdC1wdXBpbCIgY3g9IjE0NSIgY3k9Ii0xMDAiIHI9IjUiLz48L2c+PHBhdGggaWQ9Im5vc2UiIGQ9Ik0xNzUtNDBoNTBsLTI1IDI1eiIgZmlsbD0iI2YwNSIvPjxnIGlkPSJoYXQiIGZpbGw9IiNmZmYiPjxwYXRoIGlkPSJoYXQtYmFzZSIgZD0iTTEwMC0zNzVoMjAwdjIwMEgxMDB6Ii8+PGVsbGlwc2UgaWQ9ImhhdC10b3AtMSIgY3g9IjIwMCIgY3k9Ii0zNzUiIHJ4PSIyMDAiIHJ5PSI3NSIvPjwvZz48L2c+PC9zdmc+"
      />
    </footer>
  );
  return () => footer;
}

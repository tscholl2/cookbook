import { h } from "src/view/h";
import "./style.scss";

export function Footer() {
  return (
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
          <a href="#">
            <span>🏠</span>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span>?</span>
            <span>About</span>
          </a>
        </li>
      </ul>
      <img
        style={{ marginBottom: "40px" }}
        src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-500 -500 970 800"><g id="group" stroke-width="10" stroke="#000"><g id="ears" fill="#a0d"><path id="right-ear" d="M200-150l250-250a50 50 0 0 0-100-50z"/><path id="left-ear" d="M200-150L-50-400a50 50 0 0 1 100-50z"/></g><circle id="tail" cx="-440" r="50" fill="#a0d"/><g id="legs" stroke-width="30"><path id="front-right-leg" d="M200 200v75"/><path id="front-left-leg" d="M150 200v75"/><path id="back-right-leg" d="M-150 200v75"/><path id="back-left-leg" d="M-200 200v75"/></g><ellipse id="body" rx="400" ry="250" fill="#a0d"/><g id="eyes"><circle id="right-eye" cx="255" cy="-100" r="45" fill="#fff"/><circle id="right-pupil" cx="255" cy="-100" r="5"/><circle id="left-eye" cx="145" cy="-100" r="45" fill="#fff"/><circle id="left-pupil" cx="145" cy="-100" r="5"/></g><path id="nose" d="M175-40h50l-25 25z" fill="#f05"/><g id="hat" fill="#fff"><path id="hat-base" d="M100-375h200v200H100z"/><ellipse id="hat-top-1" cx="200" cy="-375" rx="200" ry="75"/></g></g></svg>`}
        alt="logo"
      />
    </footer>
  );
}

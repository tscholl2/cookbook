import { h } from "src/view/h";
import "./style.scss";

export function Footer() {
  return (
    <footer class="cookbook-footer">
      <ul class="nav">
        <li class="nav-item">link to source</li>
        <li class="nav-item">link to about</li>
        <li class="nav-item">link to else</li>
      </ul>
      <img src="http://via.placeholder.com/150x150" alt="logo" />
    </footer>
  );
}

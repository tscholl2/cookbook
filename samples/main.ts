import { samples } from ".";
import "./imports";

function update() {
  const sidebar = document.getElementById("sample-links")!;
  sidebar.innerHTML = "";
  const ul = document.createElement("ul");
  for (const k in samples) {
    const { name, filename } = samples[k];
    const li = document.createElement("li");
    li.onclick = () => {
      history.pushState({}, "", `${location.pathname}?name=${encodeURIComponent(name)}`);
      update();
    };
    li.innerText = name;
    li.title = filename;
    document.title = filename;
    ul.appendChild(li);
  }
  sidebar.appendChild(ul);
  const m = /name=([^\&]+)/g.exec(location.search);
  const path = m ? m[1] : "";
  const name = Object.keys(samples).find(k => encodeURIComponent(k) === path);
  if (name === undefined) {
    return;
  }
  let root = document.getElementById("root");
  if (root == null) {
    const container = document.getElementById("sample-container")!
    container.innerHTML = "";
    root = document.createElement("div");
    container.appendChild(root);
  } else {
    root.innerHTML = "";
  }
  // TODO: try shadow dom?
  // const shadow = host.attachShadow({ mode: "open" });
  // TODO: iframe is probably better
  samples[name].render(root);
}

function renderControls() {
  const controls = document.getElementById("sample-controls")!;
  controls.innerHTML = "";
  [
    [
      "clear",
      () => {
        history.pushState({}, "", `${location.pathname}${location.search}`);
        update();
      },
    ],
    ["back", () => history.back()],
    ["forward", () => history.forward()],
  ].forEach(([name, action]) => {
    const btn = document.createElement("button");
    btn.innerText = name as any;
    btn.onclick = action as any;
    controls.appendChild(btn);
  });
}

addEventListener("popstate", update);

update();
renderControls();

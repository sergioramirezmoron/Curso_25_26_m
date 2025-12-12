import { renderMain } from "./components/renderMain";

export default function createApp() {
  const appDiv = document.querySelector("#app");
  appDiv.appendChild(renderMain());
}

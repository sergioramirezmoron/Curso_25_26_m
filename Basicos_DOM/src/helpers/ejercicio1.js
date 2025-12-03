import fetching from "../utils/fetching";
export function createEjercicio1() {
  const renderMain = (array) => {
    const container = document.createElement("div");
    const message = document.createElement("h1");
    message.textContent = array.texto;
    message.classList.add("welcome-message");
    container.appendChild(message);

    return container;
  };
  const render = () => {
    const mainContainer = document.createElement("div");
    const v1Wrapper = document.createElement("div");
    fetching("bienvenida").then((data) =>
      v1Wrapper.appendChild(renderMain(data))
    );
    mainContainer.appendChild(v1Wrapper);
    return mainContainer;
  };
  return { render };
}

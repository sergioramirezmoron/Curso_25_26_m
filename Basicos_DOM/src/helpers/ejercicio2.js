import fetching from "../utils/fetching";
export function createEjercicio2() {
  const renderMain = (arrayTareas) => {
    const container = document.createElement("div");
    const lista = document.createElement("ul");

    arrayTareas.forEach((tarea) => {
      let completed = "✗";
      const element = document.createElement("li");
      element.classList.add("task-item");

      if (tarea.completada) {
        element.classList.add("completed");
        completed = " ✓";
      }
      const texto = document.createElement("p");
      texto.textContent = `${completed} ${tarea.texto}`;
      element.appendChild(texto);

      lista.appendChild(element);
    });
    container.appendChild(lista);
    return container;
  };

  const render = () => {
    const mainContainer = document.createElement("div");
    const v1Wrapper = document.createElement("div");
    fetching("tareas").then((data) => v1Wrapper.appendChild(renderMain(data)));
    mainContainer.appendChild(v1Wrapper);
    return mainContainer;
  };
  return {
    render,
  };
}

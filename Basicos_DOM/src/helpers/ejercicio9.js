import fetching from "../utils/fetching";
export const createEjercicio9 = () => {
  // render Header
  const renderHeader = () => {
    const header = document.createElement("div");

    const tituloHeader = document.createElement("h1");
    tituloHeader.textContent = "📅 Timeline de Eventos";
    header.appendChild(tituloHeader);
    return header;
  };

  // RenderMain
  const renderMain = (arrayEventos) => {
    const container = document.createElement("div");
    container.classList.add("timeline-container");

    const lineaContainer = document.createElement("div");
    lineaContainer.classList.add("timeline-line");

    arrayEventos.forEach((evento) => {
      const event = document.createElement("div");
      event.classList.add("timeline-item");

      evento.id % 2 === 0
        ? event.classList.add("left")
        : event.classList.add("right");

      const contentContainer = document.createElement("div");
      contentContainer.classList.add("event-content");

      const tituloEvento = document.createElement("h3");
      tituloEvento.classList.add("event-title");
      tituloEvento.textContent = evento.nombre;
      contentContainer.appendChild(tituloEvento);

      const datetimeEvento = document.createElement("p");
      datetimeEvento.classList.add("event-datetime");
      datetimeEvento.textContent = `${evento.fecha} - ${evento.hora}`;
      contentContainer.appendChild(datetimeEvento);

      const locationEvento = document.createElement("p");
      locationEvento.classList.add("event-location");
      locationEvento.textContent = `🚩${evento.lugar}`;
      contentContainer.appendChild(locationEvento);

      const ponentesContainer = document.createElement("div");
      ponentesContainer.classList.add("speakers-list");

      evento.ponentes.forEach((ponente) => {
        const ponent = document.createElement("p");
        ponent.textContent = ponente;
        ponentesContainer.appendChild(ponent);
      });
      contentContainer.appendChild(ponentesContainer);

      const adicionalContainer = document.createElement("div");
      adicionalContainer.classList.add("event-meta");

      const precio = document.createElement("p");
      precio.textContent = `${evento.precio}€`;
      adicionalContainer.appendChild(precio);
      const asistentes = document.createElement("p");
      asistentes.textContent = `${evento.asistentes} asistentes`;
      adicionalContainer.appendChild(asistentes);

      contentContainer.appendChild(adicionalContainer);
      event.appendChild(contentContainer);
      container.appendChild(event);
    });
    container.appendChild(lineaContainer);
    return container;
  };

  // Renderizamos
  const render = () => {
    const mainController = document.createElement("div");
    const v1Wrapper = document.createElement("div");
    v1Wrapper.appendChild(renderHeader());

    fetching("eventos").then((data) => v1Wrapper.appendChild(renderMain(data)));
    mainController.appendChild(v1Wrapper);
    return mainController;
  };
  return { render };
};

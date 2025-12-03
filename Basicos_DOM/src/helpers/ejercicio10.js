import fetching from "../utils/fetching";
export const createEjercicio10 = () => {
  //Render Projectos
  const renderProjects = (arrayProyectos, grid) => {
    grid.innerHTML = "";
    arrayProyectos.forEach((proyecto) => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      const contenido = document.createElement("div");
      contenido.classList.add("project-card-content");

      if (proyecto.destacado) {
        const span = document.createElement("span");
        span.textContent = "⭐";
        span.classList.add("featured-badge");
        card.appendChild(span);
      }

      const img = document.createElement("img");
      img.src = proyecto.imagen;
      img.alt = proyecto.titulo;
      contenido.appendChild(img);

      const titulo = document.createElement("h3");
      titulo.textContent = proyecto.titulo;
      titulo.classList.add("project-title");
      contenido.appendChild(titulo);

      const descripcion = document.createElement("h3");
      descripcion.textContent = proyecto.descripcion;
      descripcion.classList.add("project-description");
      contenido.appendChild(descripcion);

      const techContainer = document.createElement("div");
      techContainer.classList.add("tech-stack");

      proyecto.tecnologias.forEach((tecnologia) => {
        const tech = document.createElement("span");
        tech.textContent = tecnologia;
        tech.classList.add("tech-badge");
        techContainer.appendChild(tech);
      });
      contenido.appendChild(techContainer);

      card.appendChild(contenido);
      grid.appendChild(card);
    });
    return grid;
  };

  // RenderizarMain
  const renderMain = (arrayProyectos) => {
    const container = document.createElement("div");
    container.classList.add("portfolio-container");

    // Título
    const titulo = document.createElement("h1");
    titulo.textContent = "💼 Portafolio de Proyectos";
    container.appendChild(titulo);

    const containerFilters = document.createElement("div");
    containerFilters.classList.add("filter-buttons");

    const containerContador = document.createElement("div");
    containerContador.classList.add("projects-count");
    const contador = document.createElement("p");
    contador.textContent = `Mostrando ${arrayProyectos.length} proyectos`;
    containerContador.appendChild(contador);

    const gridProyectos = document.createElement("div");
    gridProyectos.classList.add("projects-grid");
    const actualizar = (filtro) => {
      let filtrados =
        filtro === "Todos"
          ? arrayProyectos
          : arrayProyectos.filter((p) => p.tecnologias.includes(filtro));

      renderProjects(filtrados, gridProyectos);
      contador.textContent = `Mostrando ${filtrados.length} proyectos`;
    };
    const arrayBotones = ["Todos", "React", "JavaScript", "Vue.js", "Node.js"];

    for (let i = 0; i < arrayBotones.length; i++) {
      const btn = document.createElement("button");
      btn.textContent = arrayBotones[i];
      btn.classList.add("filter-btn");
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((e) => e.classList.remove("active"));
        btn.classList.add("active");
        actualizar(btn.textContent);
      });
      containerFilters.appendChild(btn);
    }
    container.appendChild(containerFilters);
    container.appendChild(containerContador);
    container.appendChild(renderProjects(arrayProyectos, gridProyectos));

    return container;
  };

  //Render
  const render = () => {
    const mainContainer = document.createElement("div");
    const v1Wrapper = document.createElement("div");
    fetching("proyectos").then((data) =>
      v1Wrapper.appendChild(renderMain(data))
    );

    mainContainer.appendChild(v1Wrapper);
    return mainContainer;
  };
  return { render };
};

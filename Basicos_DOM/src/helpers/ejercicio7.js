import fetching from "../utils/fetching";

export const createEjercicio7 = () => {
  // renderTable
  const renderTable = (arrayPublicaciones) => {
    const container = document.createElement("div");
    container.classList.add("blog-container");

    arrayPublicaciones.forEach((publicacion) => {
      const card = document.createElement("div");
      card.classList.add("post");

      const titulo = document.createElement("h2");
      titulo.classList.add("post-title");
      titulo.textContent = publicacion.titulo;
      card.appendChild(titulo);

      const metadatos = document.createElement("h3");
      metadatos.classList.add("post-meta");
      metadatos.textContent = `${publicacion.autor} | ${publicacion.fecha}`;
      card.appendChild(metadatos);

      const contenido = document.createElement("p");
      contenido.classList.add("post-content");
      contenido.textContent = publicacion.contenido;
      card.appendChild(contenido);

      const tagContainer = document.createElement("div");
      tagContainer.classList.add("tags-container");

      publicacion.etiquetas.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.classList.add("tag");
        tagElement.textContent = tag;
        tagContainer.appendChild(tagElement);
      });

      card.appendChild(tagContainer);

      const contadorLikes = document.createElement("p");
      contadorLikes.classList.add("likes-count");
      contadorLikes.textContent = `❤️ ${publicacion.likes} Likes`;
      card.appendChild(contadorLikes);

      container.appendChild(card);
    });

    return container;
  };

  // render
  const render = () => {
    const mainContainer = document.createElement("div");
    const v1Wrapper = document.createElement("div");

    fetching("publicaciones")
      .then((data) => v1Wrapper.appendChild(renderTable(data)))
      .catch((err) => {
        console.log("Error: ", err);
        throw err;
      });
    mainContainer.appendChild(v1Wrapper);
    return mainContainer;
  };

  return {
    render,
  };
};

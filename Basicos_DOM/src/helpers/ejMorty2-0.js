// ejercicio dictado por el profesor
// http://rickandmortyapi.com/api/character/?name=ElNombreQueSea
// Crear un buscador dinámico(con cada pulsación del teclado realizo la búsqueda) para que a través de un formulario utilizando el botón de buscar o un enter, me realizará una búsqueda por el nombre de todas las posibles coincidencias, mostrando en un grid los resultados.
// 1. Utilizar fetch para traer los datos de la API.
// 2. Implementar una caché para que a través de un Map guarde las búsquedas anteriores. Si busco dos veces la misma palabra, no lo buscará en la API, si no que lo traerá del Map.

export const createEjercicioMorty = () => {
  // Fetch a la api
  const renderData = async (query) => {
    try {
      const response = await fetch(
        `http://rickandmortyapi.com/api/character/?name=${query}`
      );

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error(error);
    }
  };

  const renderGridImages = (arrayBusqueda) => {
    const container = document.createElement("div");
    arrayBusqueda.forEach((busqueda) => {
      const card = document.createElement("div");
      const image = document.createElement("img");
      image.src = busqueda.image;
      image.alt = busqueda.name;
      card.appendChild(image);

      const nombre = document.createElement("h3");
      nombre.textContent = busqueda.name;
      card.appendChild(nombre);

      container.appendChild(card);
    });
    return container;
  };

  const renderMain = () => {
    const container = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.type = "text";
    form.appendChild(input);
    container.appendChild(form);

    input.addEventListener("input", async (e) => {
      e.preventDefault();
      container.appendChild(renderGridImages(await renderData(input.value)));
    });
    return container;
  };

  const render = () => {
    const mainController = document.createElement("div");
    const v1Wrapper = document.createElement("div");
    v1Wrapper.appendChild(renderMain());
    mainController.appendChild(v1Wrapper);
    return mainController;
  };
  return { render };
};

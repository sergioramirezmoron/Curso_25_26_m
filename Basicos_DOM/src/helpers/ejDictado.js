// ejercicio dictado por el profesor
// http://rickandmortyapi.com/api/character/?name=ElNombreQueSea
// Crear un buscador dinámico(con cada pulsación del teclado realizo la búsqueda) para que a través de un formulario utilizando el botón de buscar o un enter, me realizará una búsqueda por el nombre de todas las posibles coincidencias, mostrando en un grid los resultados.
// 1. Utilizar fetch para traer los datos de la API.
// 2. Implementar una caché para que a través de un Map guarde las búsquedas anteriores. Si busco dos veces la misma palabra, no lo buscará en la API, si no que lo traerá del Map.

export function createEjDictado() {
  const cache = new Map();

  // Crear el buscador dinámico
  const renderSearchGrid = () => {
    const container = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const resultsGrid = document.createElement("div");

    const search = async (query) => {
      query = query.trim().toLowerCase();
      if (!query) {
        resultsGrid.innerHTML = "";
        return;
      }

      if (cache.has(query)) {
        renderResults(cache.get(query), resultsGrid);
        return;
      }

      try {
        const url = `https://rickandmortyapi.com/api/character/?name=${query}`;
        const response = await fetch(url);
        if (!response.ok) {
          cache.set(query, { results: [] });
          renderResults({ results: [] }, resultsGrid);
          return;
        }
        const data = await response.json();

        cache.set(query, data);
        renderResults(data, resultsGrid);
      } catch (error) {
        resultsGrid.innerHTML = "<p>No se encontraron resultados</p>";
      }
    };

    input.type = "text";
    input.placeholder = "Buscar...";
    resultsGrid.style.display = "grid";
    resultsGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
    resultsGrid.style.gap = "10px";

    input.addEventListener("input", async () => {
      search(input.value);
    });

    input.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      search(input.value);
    });
    form.appendChild(input);
    container.appendChild(form);
    container.appendChild(resultsGrid);
    return container;
  };

  // Renderizar resultados en un grid
  const renderResults = (data, grid) => {
    grid.innerHTML = "";

    if (!data.results) {
      grid.innerHTML = "<p>No hay resultados</p>";
      return;
    }

    data.results.forEach((char) => {
      const card = document.createElement("div");
      card.style.border = "1px solid #ccc";
      card.style.padding = "10px";
      card.style.textAlign = "center";

      card.innerHTML = `
        <img src="${char.image}" width="100" />
        <p>${char.name}</p>
      `;

      grid.appendChild(card);
    });
  };

  // Render
  const render = () => {
    const wrapper = document.createElement("div");
    wrapper.appendChild(renderSearchGrid());
    return wrapper;
  };

  return { render };
}

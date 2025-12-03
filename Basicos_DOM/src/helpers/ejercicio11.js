export default function createEjercicio11() {
  const state = {
    cache: new Map(),
    isLoading: false,
  };

  // Verifica cada 500ms
  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  // Función buscar
  const search = async (query) => {
    query = query.trim().toLowerCase();
    if (!query) return null;

    if (state.cache.has(query)) {
      return displayCharacters(state.cache.get(query));
    }

    try {
      const response = await fetch(
        `http://rickandmortyapi.com/api/character/?name=${query}`
      );
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      state.cache.set(query, data.results);
      return displayCharacters(data.results);
    } catch (error) {
      return null;
    }
  };

  // Cards de personajes
  const displayCharacters = (arrayPersonajes) => {
    // Contenedores principales
    const containerImages = document.createElement("div");
    // Cargar imagenes
    arrayPersonajes.forEach((character) => {
      const card = document.createElement("div");
      const name = document.createElement("h2");
      name.textContent = character.name;
      const image = document.createElement("img");
      image.style = "width: 100px";
      image.src = character.image;
      image.alt = character.name;
      card.appendChild(name);
      card.appendChild(image);
      containerImages.appendChild(card);
    });
    return containerImages;
  };

  // Mostrar cargando
  const displayLoading = () => {
    if (state.isLoading) {
      const element = document.createElement("svg");
      element.classList.add("spinner");
      element.setAttribute("viewBox", "0 0 50 50");
      element.innerHTML = `<circle cx="25" cy="25" r="20" fill="none" />`;
      return element;
    }

    return null;
  };

  //Mostrar errores
  const displayError = (tipo, msg) => {
    if (tipo !== "error" && tipo !== "success") {
      throw new Error("Incorrecto uso");
    }

    const msgContainer = document.createElement("h3");
    if (tipo === "success") {
      msgContainer.classList.add("success");
    } else {
      msgContainer.classList.add("error");
    }
    msgContainer.textContent = msg;
    return msgContainer;
  };

  // Renderizar
  const render = () => {
    const mainContainer = document.createElement("div");
    const v1Wrapper = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.type = "text";
    form.appendChild(input);

    const debouncedSearch = debounce(async (val) => {
      v1Wrapper.innerHTML = "";
      state.isLoading = true;
      v1Wrapper.appendChild(displayLoading());

      const result = await search(val);

      state.isLoading = false;
      v1Wrapper.innerHTML = "";

      if (result) {
        v1Wrapper.innerHTML = "";
        v1Wrapper.appendChild(displayError("success", "¡Éxito!"));
        v1Wrapper.appendChild(result);
      } else {
        v1Wrapper.appendChild(
          displayError("error", "No se encontraron personajes")
        );
      }
    }, 500);

    input.addEventListener("input", async () => {
      debouncedSearch(input.value);
    });

    mainContainer.appendChild(form);
    mainContainer.appendChild(v1Wrapper);
    return mainContainer;
  };

  return {
    render,
  };
}

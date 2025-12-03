// -------------------------------------------------------------------------------------------------
//EJ1
// Crear una aplicación que consulta la api del clima constituida por 6 elementos subdivididos en un header, un footer y un main. API de OpenWeather

// El Header y el Footer se construyen utilizando los elementos que hemos visto del DOM.
// Crear y estilar

// El main está subdividido en 3 componentes que son las searchCard, weatherCard y favoriteCard.

// El componente search se encarga de buscar dentro de la api la ciudad que queramos.

// Ejemplificar el uso de un almacenamiento con MAP en localStorage. (cache)

// El weatherCard dispondremos de un array de 15 imagenes almacenadas en /public con los diferentes estados climatológicos posibles.

// La tarjeta favoriteCard almacenará las ciudades o tarjetas favoritas.

// Para hacer favorita una ciudad basta con dar dos click de ratón y automáicamente se guardará en la cardFavorite.

// Para sacar una tarjeta de las favoritas, botón derecho (opcional pedir confirmacion).

// Persistencia de datos IMPORTANTE.

// -------------------------------------------------------------------------------------------------
export const createEjercicioWeather2 = () => {
  const API_URL = import.meta.env.VITE_API_OPENWEATHER || "";
  const API_KEY = import.meta.env.VITE_API_KEYWEATHER || "";

  // Guardar y sacar LocalStorage
  const guardarLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify([...value]));
  };

  const sacarLS = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return;
    return new Map(JSON.parse(data));
  };

  // Render Header
  const renderHeader = () => {
    const header = document.createElement("div");
    const text = document.createElement("h1");
    text.textContent = "Weather App";
    header.appendChild(text);
    return header;
  };

  // Render Footer
  const renderFooter = () => {
    const footer = document.createElement("div");
    const text = document.createElement("p");
    text.textContent = "2025. Todos los derechos reservados. Sergio Ramírez";
    footer.appendChild(text);
    return footer;
  };

  // Buscador
  const search = async (query) => {
    const cache = sacarLS("cache") || new Map();
    if (cache.has(query)) return cache.get(query);

    const response = await fetch(`${API_URL}?q=${query}&appid=${API_KEY}`);
    if (!response.ok) throw new Error("Error trayendo data de la API");
    const data = await response.json();
    cache.set(query, data);
    guardarLS("cache", cache);
    return data;
  };

  //Actualizar
  const actualizar = () => {
    const favContainer = document.querySelector("#fav-container");
    favContainer.innerHTML = "<h2>Favoritos</h2>";
    favContainer.appendChild(renderFavoritesCards(sacarLS("favoritos")));
  };

  // Render cards
  const renderCard = (city) => {
    console.log(city);
    const card = document.createElement("div");

    const cityName = document.createElement("h3");
    cityName.textContent = city.name;

    const cityTemp = document.createElement("p");
    cityTemp.textContent = `${city.main.temp - 273}ºC`;

    const citySky = document.createElement("p");
    citySky.textContent = city.weather[0].description;

    card.appendChild(cityName);
    card.appendChild(cityTemp);
    card.appendChild(citySky);

    card.addEventListener("dblclick", (e) => {
      e.preventDefault();
      const data = sacarLS("favoritos") || new Map();
      data.set(city.name, city);
      guardarLS("favoritos", data);
      actualizar();
    });

    const favoritos = sacarLS("favoritos") || new Map();
    if (favoritos) {
      card.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const data = sacarLS("favoritos");
        data.delete(city.name);
        guardarLS("favoritos", data);
        actualizar();
      });
    }

    return card;
  };

  const renderFavoritesCards = (favorites = []) => {
    const container = document.createElement("div");
    [...favorites.values()].forEach((favorito) => {
      container.appendChild(renderCard(favorito));
    });
    return container;
  };

  // Render main
  const renderMain = () => {
    const container = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.type = "text";
    form.appendChild(input);
    container.appendChild(form);

    const containerCards = document.createElement("div");
    const tituloContainerCards = document.createElement("h2");
    tituloContainerCards.textContent = "Resultados";
    containerCards.appendChild(tituloContainerCards);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      containerCards.appendChild(renderCard(await search(input.value)));
    });
    container.appendChild(containerCards);

    const containerFavoriteCards = document.createElement("div");
    containerFavoriteCards.id = "fav-container";
    const tituloContainerFavoriteCards = document.createElement("h2");
    tituloContainerFavoriteCards.textContent = "Favoritos";
    containerFavoriteCards.appendChild(tituloContainerFavoriteCards);
    containerFavoriteCards.appendChild(
      renderFavoritesCards(sacarLS("favoritos"))
    );

    container.appendChild(containerFavoriteCards);

    return container;
  };

  // Render app
  const render = () => {
    const mainContainer = document.createElement("div");
    const v1Wrapper = document.createElement("div");
    v1Wrapper.appendChild(renderHeader());
    v1Wrapper.appendChild(renderMain());
    v1Wrapper.appendChild(renderFooter());
    mainContainer.appendChild(v1Wrapper);
    return mainContainer;
  };

  return { render };
};

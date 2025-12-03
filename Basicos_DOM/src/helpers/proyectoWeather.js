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
export const createProyectoWeather = () => {
  // Variables de entorno
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_API_KEYWEATHER || "";

  // Guardar en localStorage
  const guardarLocalStorage = (tipo, valor) =>
    localStorage.setItem(tipo, JSON.stringify([...valor]));

  // Sacar localStorage
  const sacarLocalStorage = (tipo) => {
    const data = localStorage.getItem(tipo);
    if (!data) return null;
    const map = new Map(JSON.parse(data));
    return map;
  };

  // cache y favoritos
  const cache = new Map(sacarLocalStorage("cache") || []);
  const favoritos = new Map(sacarLocalStorage("favoritos") || []);

  // Renderizamos header y footer
  const renderHeader = () => {
    const header = document.createElement("header");
    header.style.textAlign = "center";

    const title = document.createElement("h1");
    title.textContent = "Weather App";

    const description = document.createElement("h3");
    description.textContent =
      "La aplicación del clima más usada hasta el momento";

    header.appendChild(title);
    header.appendChild(description);
    return header;
  };

  const renderFooter = () => {
    const footer = document.createElement("div");
    footer.style.textAlign = "center";

    const copyright = document.createElement("p");
    copyright.textContent =
      "2025 Todos los derechos reservados. Sergio Ramírez.";
    copyright.style.color = "gray";

    footer.appendChild(copyright);
    return footer;
  };

  // Renderizamos main.
  const searchCard = async (query) => {
    if (!query) return null;
    if (cache.has(query)) {
      return cache.get(query);
    }

    query = query.trim().toLowerCase();
    try {
      const response = await fetch(`${API_URL}?q=${query}&appid=${API_KEY}`);
      const data = await response.json();
      cache.set(query, data);
      guardarLocalStorage("cache", cache);
      return data;
    } catch {
      return null;
    }
  };

  // Añadir y eliminar de favoritos
  const addFavorite = (city) => {
    if (!city) return null;
    favoritos.set(city.name.toLowerCase(), city);
    guardarLocalStorage("favoritos", favoritos);
  };

  const removeFavorite = (city) => {
    if (!city || city === null) return null;

    const key = city.name.toLowerCase();

    if (!favoritos.has(key)) return null;

    favoritos.delete(key);
    guardarLocalStorage("favoritos", favoritos);
  };

  const updateFavoritesUI = () => {
    const container = document.getElementById("favoritos-container");
    container.innerHTML = "";
    container.appendChild(renderFavorites(favoritos.values()));
  };

  // Carta del tiempo
  const weatherCard = (city) => {
    if (!city || city === null) return null;
    const cardContainer = document.createElement("div");
    const card = document.createElement("div");
    const nombreCiudad = document.createElement("h2");
    nombreCiudad.textContent = city.name;
    card.appendChild(nombreCiudad);

    const temperatura = document.createElement("p");
    const temp = (Number(city.main.temp) - 273.15).toFixed(1);
    temperatura.textContent = `${temp}ºC`;
    card.appendChild(temperatura);

    const cielo = document.createElement("p");
    cielo.textContent = city.weather[0].main;
    card.appendChild(cielo);

    card.addEventListener("dblclick", () => {
      addFavorite(city);
      updateFavoritesUI();
    });

    card.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      removeFavorite(city);
      updateFavoritesUI();
    });

    cardContainer.appendChild(card);

    return cardContainer;
  };

  const renderFavorites = (favoritas) => {
    const container = document.createElement("div");
    favoritas.forEach((favorita) =>
      container.appendChild(weatherCard(favorita))
    );
    return container;
  };

  const renderMain = () => {
    const container = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Introduzca el nombre de una ciudad";
    form.appendChild(input);

    const textoCiudades = document.createElement("h1");
    textoCiudades.textContent = "Ciudades Buscadas";

    const ciudadesBuscadasContainer = document.createElement("div");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      ciudadesBuscadasContainer.appendChild(
        weatherCard(await searchCard(input.value))
      );
    });

    const textoFavoritas = document.createElement("h1");
    textoFavoritas.textContent = "Ciudades favoritas";

    const ciudadesFavoritasContainer = document.createElement("div");
    ciudadesFavoritasContainer.id = "favoritos-container";
    ciudadesFavoritasContainer.appendChild(renderFavorites(favoritos.values()));

    container.appendChild(form);
    container.appendChild(textoCiudades);
    container.appendChild(ciudadesBuscadasContainer);
    container.appendChild(textoFavoritas);
    container.appendChild(ciudadesFavoritasContainer);

    return container;
  };

  // Renderizamos todo el proyecto
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

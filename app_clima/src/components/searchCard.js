export default function createSearchCard(onSearch) {
  // Variables privadas
  let isSearching = false;

  // Contenedor del DOM
  const container = document.createElement("div");
  container.className = "bg-white rounded-lg shadow-lg p-6 mb-6";
  //titulo
  const titulo = document.createElement("h2");
  titulo.textContent = "🔎 Buscar Ciudad";
  //input
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Introduzca aqui la ciudad a buscar";
  //boton
  const searchButton = document.createElement("button");
  searchButton.textContent = "Buscar";

  // Crear un componente de tipo parrafo llamado statusElement que permita especificar los siguientes estados a través de la función setStatus(message, info)
  // Los estados son:
  //1. Loading. color azul 600
  //2. Error. color rojo 600
  //3. Success color verde 600
  //4. Info color gray 600
  // Crear el componente y la función, por defecto, siempre será Info.
  //  permita modificar el valor del componente statusElement

  const statusElement = document.createElement("p");
  statusElement.textContent = "";
  const setStatus = (message, type = "info") => {
    statusElement.textContent = message.trim();
    if (type === "loading") {
      statusElement.className = "text-blue-600";
    } else if (type === "error") {
      statusElement.className = "text-red-600";
    } else if (type === "success") {
      statusElement.className = "text-green-600";
    } else {
      statusElement.className = "text-gray-600";
    }
  };

  const performSearch = async () => {
    const cityName = input.value.trim();
    if (!cityName) {
      setStatus("Escribe el nombre de la ciudad", "error");
      return;
    }

    //Comenzamos la búsqueda
    isSearching = true;
    // Ahora hacemos la búsqueda
    try {
      await onSearch(cityName);
      setStatus("Búsqueda realizada con éxito", "success");
    } catch (error) {
      setStatus("Error haciendo la busqueda", "error");
      throw new Error("Error haciendo fetching");
    } finally {
      isSearching = false;
    }

    // Eventos
    searchButton.addEventListener("click", performSearch);

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        perfomSearch();
      }
    });

    // poner los appendChilds
  };

  return {
    status: container,
    focus: () => input.focus(),
    clearForm: () => {
      input.value = "";
      setStatus("");
      isSearching = false;
    },
    getValue: () => input.value.trim(),
  };
}

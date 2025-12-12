export const createApp = () => {
  const app = document.getElementById("app");

  const header = document.createElement("header");
  header.className = "header";

  const title = document.createElement("h1");
  title.textContent = "MovieFlix Sergio Ramírez";
  title.className = "header-title";
  header.appendChild(title);

  const main = document.createElement("main");
  main.className = "main-container";

  const filterContainer = document.createElement("div");
  filterContainer.className = "filters-container";

  const searchContainer = document.createElement("div");
  searchContainer.className = "search-container";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.className = "search-input";
  searchInput.placeholder = "Buscar película...";
  searchContainer.appendChild(searchInput);
  filterContainer.appendChild(searchContainer);

  const sortContainer = document.createElement("div");
  sortContainer.className = "sort-container";
  const sort = document.createElement("select");
  sort.className = "sort-select";

  const sorts = ["Sin filtro", "Mejor valoradas", "Titulo A-Z", "Titulo Z-A"];
  sorts.forEach((sortOption) => {
    const option = document.createElement("option");
    option.value = sortOption;
    option.textContent = sortOption;
    sort.appendChild(option);
  });
  sortContainer.appendChild(sort);
  filterContainer.appendChild(sortContainer);
  main.appendChild(filterContainer);

  const moviesContainer = document.createElement("div");
  moviesContainer.className = "movies-container";
  moviesContainer.id = "moviesContainer";

  main.appendChild(moviesContainer);

  app.appendChild(header);
  app.appendChild(main);
};
                                                                                                   
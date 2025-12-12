import fetching from "../utils/fetching";
export function createEjercicio8() {
  const renderMenu = (arrayMenu) => {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");

    const tituloRestaurante = document.createElement("h1");
    tituloRestaurante.classList.add("restaurant-title");
    tituloRestaurante.textContent = "Restaurante";
    menuContainer.appendChild(tituloRestaurante);

    // Recorremos el array
    arrayMenu.categorias.forEach((categoria) => {
      const categorySection = document.createElement("section");
      categorySection.classList.add("menu-category");

      const nombreCategoria = document.createElement("h3");
      nombreCategoria.classList.add("category-title");
      nombreCategoria.textContent = categoria.nombre;
      categorySection.appendChild(nombreCategoria);

      const separador = document.createElement("hr");
      separador.classList.add("category-divider");
      categorySection.appendChild(separador);

      const containerPlatos = document.createElement("div");
      containerPlatos.classList.add("dishes-container");

      categoria.platos.forEach((plato) => {
        const platoContainer = document.createElement("div");
        platoContainer.classList.add("dish-item");

        const headerPlato = document.createElement("div");
        headerPlato.classList.add("dish-header");

        const nombrePlato = document.createElement("h4");
        nombrePlato.classList.add("dish-name");
        nombrePlato.textContent = plato.nombre;
        headerPlato.appendChild(nombrePlato);

        const precioPlato = document.createElement("p");
        precioPlato.classList.add("dish-price");
        precioPlato.textContent = `${plato.precio}€`;
        headerPlato.appendChild(precioPlato);

        const descripcionPlato = document.createElement("p");
        descripcionPlato.classList.add("dish-description");
        descripcionPlato.textContent = plato.descripcion;
        platoContainer.appendChild(headerPlato);
        platoContainer.appendChild(descripcionPlato);
        containerPlatos.appendChild(platoContainer);
      });

      categorySection.appendChild(containerPlatos);
      menuContainer.appendChild(categorySection);
    });
    return menuContainer;
  };

  const render = () => {
    const mainContainer = document.createElement("div");
    const v1Wrapper = document.createElement("div");
    fetching("menuRestaurante")
      .then((data) => v1Wrapper.appendChild(renderMenu(data)))
      .catch((err) => err);
    mainContainer.appendChild(v1Wrapper);
    return mainContainer;
  };

  return {
    render,
  };
}


import { alojamientos } from "../db/data";
import fetching from "../utils/fetching";

export function createEjercicio4() {
  //Closure Scope

  //getStars
  const getStars = (rating) => {
    const numStars = Math.floor(rating);
    return "⭐".repeat(numStars);
  };

  //renderTable
  const renderTable = (alojamientosArray) => {
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");

    const table = document.createElement("table");

    //thead
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    const th = document.createElement("th");
    ["Nombre", "Ubicación", "Precio", "Rating"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    //tbody
    const tbody = document.createElement("tbody");

    alojamientosArray.forEach((alojamiento) => {
      const trBody = document.createElement("tr");
      //nombre
      const tdNombre = document.createElement("td");
      tdNombre.textContent = alojamiento.nombre;
      trBody.appendChild(tdNombre);
      //ubicación
      const tdUbicacion = document.createElement("td");
      tdUbicacion.textContent = alojamiento.ubicacion;
      trBody.appendChild(tdUbicacion);
      //precio
      const tdPrecio = document.createElement("td");
      tdPrecio.classList.add("price");
      tdPrecio.textContent = `${alojamiento.precio}€`;
      trBody.appendChild(tdPrecio);
      //rating
      const tdRating = document.createElement("td");
      tdRating.classList.add("rating");
      tdRating.textContent = `${alojamiento.rating} ${getStars(
        alojamiento.rating
      )}`;
      trBody.appendChild(tdRating);

      // Añadimos la fila al tbody
      tbody.appendChild(trBody);
    });
    // Añadimos el tbody a la tabla
    table.appendChild(tbody);
    //Metemos la tabla en el contenedor
    tableContainer.appendChild(table);
    return tableContainer;
  };

  // render
  const render = () => {
    const mainContainer = document.createElement("div");

    //Versión asíncrona
    const v2Wrapper = document.createElement("div");
    v2Wrapper.innerHTML = "<h3>Versión asíncrona</h3>";
    fetching("alojamientos")
      .then((data) => {
        v2Wrapper.appendChild(renderTable(data));
      })
      .catch((err) => {
        console.log("Error: ", err);
        throw err;
      });
    mainContainer.appendChild(v2Wrapper);
    return mainContainer;
  };

  return {
    render,
  };
}

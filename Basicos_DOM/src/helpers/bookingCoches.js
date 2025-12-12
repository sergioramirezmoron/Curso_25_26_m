import { fetching } from "../utils/fetchingCar";

export const createBookingCoches = () => {
  // Render Header
  const renderHeader = () => {
    const header = document.createElement("header");
    const titulo = document.createElement("h1");
    titulo.textContent = "Booking de Coches";
    header.appendChild(titulo);
    return header;
  };

  // Render Footer
  const renderFooter = () => {
    const footer = document.createElement("footer");
    const copy = document.createElement("p");
    copy.textContent = "2025. Todos los derechos reservados. Sergio Ramírez.";
    footer.appendChild(copy);
    return footer;
  };

  const renderForm = (arrayCiudades) => {
    const container = document.createElement("div");
    const form = document.createElement("form");
    const select = document.createElement("select");
    arrayCiudades.forEach((ciudad) => {
      const option = document.createElement("option");
      option.value = ciudad.name;
      option.textContent = ciudad.name;
      select.appendChild(option);
    });
    form.appendChild(select);

    const labelPickUp = document.createElement("label");
    labelPickUp.textContent = "Fecha de recogida";
    const inputPickUp = document.createElement("input");
    inputPickUp.type = "date";

    const labelDropOff = document.createElement("label");
    labelDropOff.textContent = "Fecha de entrega";
    const inputDropOff = document.createElement("input");
    inputDropOff.type = "date";

    const labelNumberDays = document.createElement("label");
    labelNumberDays.textContent = "Numero de días";
    const inputNumberDays = document.createElement("input");
    inputNumberDays.type = "number";
    form.appendChild(labelPickUp);
    form.appendChild(inputPickUp);
    form.appendChild(labelDropOff);
    form.appendChild(inputDropOff);
    form.appendChild(labelNumberDays);
    form.appendChild(inputNumberDays);

    const btnBuscar = document.createElement("button");
    btnBuscar.textContent = "Buscar";

    btnBuscar.addEventListener("click", (e) => {
      e.preventDefault();
      renderSearch(
        select.value,
        inputPickUp.value,
        inputDropOff.value,
        inputNumberDays.value
      ).then((res) => {
        const grid = document.getElementById("coches-grid");
        if (!grid) {
          const newGrid = document.createElement("div");
          newGrid.id = "coches-grid";
          document.body.appendChild(newGrid);
        }
      });
    });

    form.appendChild(btnBuscar);
    container.appendChild(form);

    return container;
  };

  const renderCardCoche = (coche, inputNumberDays) => {
    const card = document.createElement("div");
    const modelo = document.createElement("h3");
    modelo.textContent = coche.model;

    const ciudad = document.createElement("p");
    ciudad.textContent = coche.city;

    const precio = document.createElement("p");
    precio.textContent = `${coche.pricePerDay}€`;

    card.appendChild(modelo);
    card.appendChild(ciudad);
    card.appendChild(precio);

    card.addEventListener("click", () =>
      addReserva(coche, Number(inputNumberDays.value))
    );

    return card;
  };

  const renderCarsCard = (arrayCoches, numDias) => {
    const container = document.createElement("div");
    arrayCoches.forEach((coche) => {
      container.appendChild(renderCardCoche(coche, numDias));
    });
    return container;
  };

  const addReserva = (coche, dias) => {
    const reserva = JSON.parse(localStorage.getItem("reserva")) || {};
    if (Object.keys(reserva).length > 0) return; // ✅ corregido
    const serialized = {
      modelo: coche.model, // también arreglé coche.modelo → coche.model
      ciudad: coche.city,
      dias,
      precioDia: coche.pricePerDay,
      total: coche.pricePerDay * dias * 1.21,
    };
    localStorage.setItem("reserva", JSON.stringify(serialized)); // ✅ corregido
  };

  const renderReserva = () => {
    const reserva = JSON.parse(localStorage.getItem("reserva")) || {};
    const container = document.createElement("div");
    if (reserva.size < 1) return;

    const texto = document.createElement("h2");
    texto.textContent = "Reservas";
    container.appendChild(texto);

    const card = document.createElement("div");
    const cardModelo = document.createElement("h3");
    cardModelo.textContent = reserva.modelo;
    const cardCiudad = document.createElement("p");
    cardCiudad.textContent = reserva.ciudad;
    const cardDias = document.createElement("p");
    cardDias.textContent = reserva.dias;
    const cardPrecioDia = document.createElement("p");
    cardPrecioDia.textContent = reserva.precioDia;
    const cardTotal = document.createElement("p");
    cardTotal.textContent = reserva.total;

    card.appendChild(cardModelo);
    card.appendChild(cardCiudad);
    card.appendChild(cardDias);
    card.appendChild(cardPrecioDia);
    card.appendChild(cardTotal);

    const btnFinalizar = document.createElement("button");
    btnFinalizar.textContent = "Finalizar Reserva";
    container.appendChild(btnFinalizar);

    btnFinalizar.addEventListener("click", () => {
      const reserva = JSON.parse(localStorage.getItem("reserva")) || {};
      localStorage.removeItem(reserva);
    });

    container.appendChild(card);

    return container;
  };

  const renderSearch = async (ciudad, fechRec, fecEnt, dias) => {
    try {
      const results = await fetching("cars");
      const arrayFiltrado = results.filter((coche) => {
        const rangos = coche.availableRanges.filter((rango) => {
          return (
            new Date(fechRec) >= new Date(rango.from) &&
            new Date(fecEnt) <= new Date(rango.to)
          );
        });
        if (rangos.length === 0) return false;
        return ciudad === coche.city;
      });
      const container = document.getElementById("coches-grid");
      return container.appendChild(renderCarsCard(arrayFiltrado, dias));
    } catch (error) {
      throw new Error(error);
    }
  };

  const render = () => {
    const mainContainer = document.createElement("div");

    // Header
    mainContainer.appendChild(renderHeader());

    // Grid contenedor de coches
    const gridCoches = document.createElement("div");
    gridCoches.id = "coches-grid";

    // Contenedor de reserva
    const reservaContainer = document.createElement("div");
    reservaContainer.id = "reserva-container";

    // Fetch ciudades y render formulario
    fetching("cities")
      .then((ciudades) => {
        const formContainer = renderForm(
          ciudades,
          gridCoches,
          reservaContainer
        );
        mainContainer.appendChild(formContainer);
      })
      .catch((err) => {
        const error = document.createElement("p");
        error.textContent = "Error cargando ciudades: " + err;
        mainContainer.appendChild(error);
      });

    // Añadir grid de coches y reserva al DOM
    mainContainer.appendChild(gridCoches);
    mainContainer.appendChild(reservaContainer);

    // Footer
    mainContainer.appendChild(renderFooter());

    return mainContainer;
  };

  return {
    render,
  };
};

//EJ2
// Crear un sistema booking de gestión de reservas que permita ejemplificar la reserva en un hotel.

// El sistema tendrá la siguiente interfaz, Header, Main (compuesto por un desplegable donde pueda seleccionar de una API privada que montamos con json-server las ciudades disponibles).

// Dos input dates, que son checkIn y checkOut donde el checkOut no puede ser anterior. También el número de huéspedes, automáticamente me mostrará utilizando un componente cardHotel todos aquellos hoteles que tengan disponibilidad en el rango de fechas indicados.

// Cuando le demos un click a la tarjeta que sea, automáticamente se añadirá en un componente carritoReserva la información de el hotel, el número de personas, el número de estrellas y el total a pagar.

// EL total a pagar es igual al número de huéspedes por el precio de la habitación del hotel.

// Desglosar el IVA (10%).

// Finalizar reserva, resetea todo.

// Hay persistencia, hasta que no le demos a finalizar reserva, se guardará.
import fetching from "../utils/fetching";
export const createProyectoBooking = () => {
  // Guardar y sacar del localStorage
  const guardarLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify([...value]));
  };

  const sacarLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    if (!data) {
      return [];
    }
    return new Map(JSON.parse(data));
  };

  // Caché y favoritos
  const cache = new Map(sacarLocalStorage("cache") || []);
  const reservas = new Map(sacarLocalStorage("carritoReserva") || []);

  // Renderizar header y footer
  const renderHeader = () => {
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "Proyecto Booking";
    header.appendChild(title);
    return header;
  };

  const renderFooter = () => {
    const footer = document.createElement("footer");
    const copyright = document.createElement("p");
    copyright.textContent =
      "2025. Todos los derechos reservados. Sergio Ramírez.";
    footer.appendChild(copyright);

    return footer;
  };

  const search = async (filters) => {
    const string = JSON.stringify(filters);
    if (cache.has(string)) {
      return cache.get(string);
    }
    try {
      const hotels = await fetching("hotels");
      if (!filters) {
        return hotels;
      }

      const checkIn = new Date(filters.checkIn);
      const checkOut = new Date(filters.checkOut);
      const numHuespedes = Number(filters.huespedes);

      const dataFiltrada = hotels.filter((hotel) => {
        if (numHuespedes > hotel.maxGuests) return false;

        const rangoValido = hotel.availableRanges.some((range) => {
          const from = new Date(range.from);
          const to = new Date(range.to);
          return checkIn >= from && checkOut <= to;
        });

        return rangoValido;
      });
      cache.set(string, dataFiltrada);
      guardarLocalStorage("cache", cache);
      return dataFiltrada;
    } catch (err) {
      return [];
    }
  };

  const renderGridHotel = (arrayHoteles, numHuespedes) => {
    const container = document.createElement("div");
    if (!arrayHoteles) return null;
    arrayHoteles.forEach((hotel) => {
      const card = document.createElement("div");
      const name = document.createElement("h3");
      name.style.padding = "0px";
      name.style.margin = "10px";
      name.textContent = hotel.name;
      card.appendChild(name);
      const stars = document.createElement("p");
      stars.textContent = "⭐".repeat(hotel.stars);
      card.appendChild(stars);
      const price = document.createElement("p");
      price.textContent = `${hotel.pricePerGuest}€ por persona`;
      card.appendChild(price);
      card.addEventListener("click", () => {
        addReserva(hotel, Number(numHuespedes));
      });

      container.appendChild(card);
    });
    return container;
  };

  const addReserva = (hotel, numHuespedes) => {
    if (reservas.size > 0) {
      return false;
    }
    const object = {
      nombre: hotel.name,
      personas: numHuespedes,
      estrellas: "⭐".repeat(hotel.stars),
      precio: hotel.pricePerGuest * numHuespedes,
      iva: hotel.pricePerGuest * numHuespedes * 0.1,
      total:
        hotel.pricePerGuest * numHuespedes +
        hotel.pricePerGuest * numHuespedes * 0.1,
    };

    reservas.set(hotel.name, object);
    guardarLocalStorage("carritoReserva", reservas);

    const container = document.getElementById("reserva-container");
    if (container) {
      container.innerHTML = "";
      container.appendChild(renderReserva());
    }
  };

  const finishReserva = () => {
    reservas.clear();
    guardarLocalStorage("carritoReserva", reservas);
  };

  // reserva
  const renderReserva = () => {
    const containerReserva = document.createElement("div");
    containerReserva.id = "reserva-container";
    const title = document.createElement("h2");
    title.textContent = "Reserva";
    containerReserva.appendChild(title);
    [...reservas.values()].forEach((reserva) => {
      const reservaCard = document.createElement("div");
      const reservaNombre = document.createElement("h3");
      reservaNombre.textContent = reserva.nombre;
      const reservaHuespedes = document.createElement("p");
      reservaHuespedes.textContent = `${reserva.personas} personas.`;
      const reservaStars = document.createElement("p");
      reservaStars.textContent = reserva.estrellas;
      const reservaPrecio = document.createElement("p");
      reservaPrecio.textContent = `Precio: ${reserva.precio}€`;
      const reservaIva = document.createElement("p");
      reservaIva.textContent = `IVA(10%): ${reserva.iva}€`;
      const reservaTotal = document.createElement("p");
      reservaTotal.textContent = `Total: ${reserva.total}€`;
      reservaCard.appendChild(reservaNombre);
      reservaCard.appendChild(reservaHuespedes);
      reservaCard.appendChild(reservaStars);
      reservaCard.appendChild(reservaPrecio);
      reservaCard.appendChild(reservaIva);
      reservaCard.appendChild(reservaTotal);

      const btnFinalizar = document.createElement("button");
      btnFinalizar.textContent = "Finalizar Reserva";
      reservaCard.appendChild(btnFinalizar);

      btnFinalizar.addEventListener("click", () => {
        finishReserva();
        containerReserva.innerHTML = "";
      });
      containerReserva.appendChild(reservaCard);
    });
    return containerReserva;
  };

  const renderMain = () => {
    // Containers
    const container = document.createElement("div");
    const form = document.createElement("form");
    const inputCheckIn = document.createElement("input");
    inputCheckIn.type = "date";
    const inputCheckOut = document.createElement("input");
    inputCheckOut.type = "date";
    const inputHuespedes = document.createElement("input");
    inputHuespedes.type = "number";
    const enviarForm = document.createElement("button");
    enviarForm.type = "submit";
    enviarForm.textContent = "Buscar";
    const gridHoteles = document.createElement("div");

    form.appendChild(inputCheckIn);
    form.appendChild(inputCheckOut);
    form.appendChild(inputHuespedes);
    form.appendChild(enviarForm);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      gridHoteles.innerHTML = "";
      const tituloHoteles = document.createElement("h2");
      tituloHoteles.textContent = "Hoteles";
      gridHoteles.appendChild(tituloHoteles);
      if (new Date(inputCheckIn.value) > new Date(inputCheckOut.value)) {
        console.log("fecha incorrecta");
      }
      if (inputHuespedes.value < 1) {
        console.log("Huespedes incorrectos");
      }

      const filters = {
        checkIn: inputCheckIn.value,
        checkOut: inputCheckOut.value,
        huespedes: inputHuespedes.value,
      };

      const dataEncontrada = await search(filters);
      gridHoteles.appendChild(
        renderGridHotel(dataEncontrada, inputHuespedes.value)
      );
    });

    container.appendChild(form);
    container.appendChild(renderReserva());
    container.appendChild(gridHoteles);
    return container;
  };

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

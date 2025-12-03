import { ubicaciones } from "../db/data";
import fetching from "../utils/fetching";

export function createEjercicio5() {
  //Closure Scope
  //renderTable
  const renderTable = () => {
    const formContainer = document.createElement("div");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const mostrarAlerta = (tipo, mensaje) => {
      if (
        (tipo.toLowerCase() !== "error" && tipo.toLowerCase() !== "success") ||
        !mensaje
      ) {
        throw new Error("Incorrecto uso de mostrarAlerta");
      }
      messageContainer.innerHTML = "";
      const alerta = document.createElement("p");
      alerta.classList.add(tipo);
      alerta.textContent = mensaje;
      messageContainer.appendChild(alerta);
    };

    const form = document.createElement("form");
    form.classList.add("form-group");

    const inputUbicacion = document.createElement("select");
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona ubicación";
    inputUbicacion.appendChild(defaultOption);

    fetching("ubicaciones").then((data) => {
      data.forEach((ubicacion) => {
        const option = document.createElement("option");
        option.value = ubicacion.nombre;
        option.textContent = ubicacion.nombre;
        inputUbicacion.appendChild(option);
      });
    });

    const checkIn = document.createElement("input");
    checkIn.type = "date";

    const checkOut = document.createElement("input");
    checkOut.type = "date";

    const btnSubmit = document.createElement("input");
    btnSubmit.type = "submit";
    btnSubmit.value = "Buscar";

    // Crear filas con form-row
    const filaUbicacion = document.createElement("div");
    filaUbicacion.classList.add("form-row");
    filaUbicacion.appendChild(inputUbicacion);

    const filaCheckIn = document.createElement("div");
    filaCheckIn.classList.add("form-row");
    filaCheckIn.appendChild(checkIn);

    const filaCheckOut = document.createElement("div");
    filaCheckOut.classList.add("form-row");
    filaCheckOut.appendChild(checkOut);

    // Añadir filas al form
    form.appendChild(filaUbicacion);
    form.appendChild(filaCheckIn);
    form.appendChild(filaCheckOut);
    form.appendChild(btnSubmit);

    // Evento
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!inputUbicacion.value || !checkIn.value || !checkOut.value) {
        mostrarAlerta("error", "Todos los campos son obligatorios");
        return;
      }

      const ubicacion = inputUbicacion.value.trim().toLowerCase();
      const checkInDate = checkIn.value;
      const checkOutDate = checkOut.value;

      if (new Date(checkOutDate) <= new Date(checkInDate)) {
        mostrarAlerta(
          "error",
          "La fecha de salida debe ser posterior a la de entrada"
        );
        return;
      }

      mostrarAlerta("success", "Busqueda realizada con exito");
    });
    formContainer.appendChild(form);
    formContainer.appendChild(messageContainer);
    return formContainer;
  };

  //render
  const render = () => {
    const mainContainer = document.createElement("div");

    const v1Wrapper = document.createElement("div");
    v1Wrapper.innerHTML = "<h3>Formulario de búsqueda de ubicaciones</h3>";

    v1Wrapper.appendChild(renderTable());
    mainContainer.appendChild(v1Wrapper);
    return mainContainer;
  };

  return {
    render,
  };
}

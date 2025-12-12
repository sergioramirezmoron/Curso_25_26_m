import { ejFetch } from "../utils/fetchingEjemplo";

export const ejProbarFetch = () => {
  const render = async () => {
    const mainContainer = document.createElement("div");
    const v1Wrapper = document.createElement("div");
    ejFetch(); // Necesitas que sea await, porque si ves, pone promise
    // Le puedes hacer un console log pa ver q funciona.
    console.log(await ejFetch("peliculas")); // Como es await, le pones un async a la funcion
    mainContainer.appendChild(v1Wrapper);
    return mainContainer;
  }; // Espera ahora mismo, cuando escriba ya, es pa empezar a mostrar eso
  return { render }; // Esto lo hago pa probar rapido que funciona
  //BUeno ahora ns pq da error, supongo q sea alguna pollada de q estoy devolviendo contenedores vacios, pero bueno, que eso. QUe funciona. Si quieres cambiar la ruta pos vas al fetching
};

// Voy a llamar a esta funcion de ejProbarFetch

import { peliculas } from "../db/data";
import fetching from "../utils/fetching";

export function createEjercicio3() {
  // closures
  const notFetching = () => peliculas;
  const getStars = (rating) => {
    const numStars = Math.floor(rating) / 2;
    return "⭐".repeat(numStars);
  };
  const renderMovieGrid = (moviesArray) => {
    const container = document.createElement("div");
    container.classList.add("movies-container");

    moviesArray.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("card-container");

      const title = document.createElement("h2");
      title.classList.add("movie-title");

      const year = document.createElement("p");
      year.classList.add("movie-year");

      const rating = document.createElement("p");

      title.textContent = movie.titulo;
      year.textContent = `Año: ${movie.año}`;
      rating.textContent = `Rating: ${movie.rating} ${getStars(movie.rating)}`;
      card.appendChild(title);
      card.appendChild(year);
      card.appendChild(rating);
      container.appendChild(card);
    });
    return container;
  };

  const render = (bool) => {
    const mainContainer = document.createElement("div");
    if (bool) {
      // Versión síncrona
      const v1Wrapper = document.createElement("div");
      v1Wrapper.innerHTML = "<h3>Versión síncrona</h3>";
      v1Wrapper.appendChild(renderMovieGrid(notFetching()));
      mainContainer.appendChild(v1Wrapper);
    } else {
      // Versión asíncrona
      const v2Wrapper = document.createElement("div");
      v2Wrapper.innerHTML = "<h3>Versión asíncrona</h3>";
      fetching("peliculas")
        .then((data) => {
          v2Wrapper.appendChild(renderMovieGrid(data));
        })
        .catch((err) => {
          console.log("Error: ", err);
          throw err;
        });
      mainContainer.appendChild(v2Wrapper);
    }
    return mainContainer;
  };
  
  return {
    render, // ---> Esto luego se llama con () porque si no está ejecutando la función directamente aqui.
  };
}

import { createMovieCard } from "./movieCard";

export const MovieList = () => {
  const container = document.getElementById("moviesContainer");

  const clear = () => {
    if (container) container.innerHTML = "";
  };

  const render = (movies) => {
    clear();
    if (!movies || movies.length === 0) {
      const noResults = document.createElement("div");
      noResults.className = "no-results";
      noResults.textContent = "No hay películas.";
      container.appendChild(noResults);
      return;
    }
    movies.forEach((movie) => {
      const card = createMovieCardeMovieCard(movie);
      container.appendChild(card);
    });
  };

  return {
    clear,
    render,
  };
};

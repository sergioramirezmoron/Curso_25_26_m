const moviesCache = [];
const URL = "http://192.168.50.120:1492/api/movies";

const fetchMovies = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Error fetching movies");
    const data = await response.json();
    moviesCache = data.results;
    return data;
  } catch (error) {}
};

const getMovies = async () => {
  return [...moviesCache];
};

const getMovieById = async (id) => {
  return moviesCache.find((movie) => movie.id === id);
};

export const movieService = {
  fetchMovies,
  getMovies,
  getMovieById,
};

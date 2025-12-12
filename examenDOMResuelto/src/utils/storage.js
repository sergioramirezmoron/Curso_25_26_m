const KEY = "watched_movies";

const save = (movies) => {
  localStorage.setItem(KEY, JSON.stringify(movies));
};

const getWatchedMovies = () => {
  const stored = localStorage.getItem(KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (error) {
    return [];
  }
};

const addWatchedMovie = (movieId) => {
  const movies = getWatchedMovies();
  if (!movies.includes(movieId)) {
    movies.push(movieId);
    save(movies);
  }
};

const removeWatchedMovie = (movieId) => {
  const movies = getWatchedMovies();
  const index = movies.indexOf(movieId);
  if (index !== -1) {
    movies.splice(index, 1);
    save(movies);
  }
};

const isWatched = (movieId) => {
  const movies = getWatchedMovies();
  return movies.includes(movieId);
};

export const Storage = {
  getWatchedMovies,
  addWatchedMovie,
  removeWatchedMovie,
  isWatched,
};

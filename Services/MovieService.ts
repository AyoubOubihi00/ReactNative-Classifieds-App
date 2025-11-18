// Services/movieService.ts
// Ce module centralise la recuperation des films utilises par l'application.
// Les donnees proviennent de deux exports JSON telecharges depuis TMDB.
import moviesData1 from "../helpers/PopularMovies_p1.json";
import moviesData2 from "../helpers/PopularMovies_p2.json";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export const getMovies = (): Movie[] => {
  const merged = [
    // Fusion des deux listes de films en un seul tableau
    ...moviesData1.results,
    ...moviesData2.results,
  ].map((movie) => ({
    // Normalisation : ne garder que les proprietes necessaires pour notre UI
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  }));

  // Retourner la liste fusionnee prete a etre consommee par les composants / Redux
  return merged;
};

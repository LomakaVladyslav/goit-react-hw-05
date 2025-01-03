import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import { searchMovie } from "../tmdbApi";
import { useLocation, useSearchParams } from "react-router-dom";

function MoviesPage() {
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [searchParam, setSearchParam] = useSearchParams();

  const location = useLocation();
  useEffect(() => {
    if (!searchParam.get("q")) {
      setSearchedMovies(null);
      return;
    }
    const wrapper = async () => {
      const searchRes = await searchMovie(searchParam.get("q"));
      setSearchedMovies(searchRes);
    };
    wrapper();
  }, [searchParam, location]);
  function handleSubmit(e) {
    try {
      e.preventDefault();
      if (e.target[0].value.trim() === "") {
        return;
      }
      setSearchParam({ q: e.target[0].value });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Search</button>
      </form>
      {searchedMovies && (
        <MovieList movies={searchedMovies} location={location} />
      )}
    </div>
  );
}
export default MoviesPage;

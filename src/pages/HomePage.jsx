import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import { useLocation } from "react-router-dom";
import { getTrendMovies } from "../tmdbApi";

function HomePage() {
  const [trendMovies, setTrendMovies] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }
    async function wrapper() {
      const movies = await getTrendMovies();
      setTrendMovies(movies);
    }
    wrapper();
  }, [location]);
  return (
    <div>
      <h1>Trending today</h1>
      {trendMovies && <MovieList movies={trendMovies} location={location} />}
      {!trendMovies && <p>Loading...</p>}
    </div>
  );
}
export default HomePage;
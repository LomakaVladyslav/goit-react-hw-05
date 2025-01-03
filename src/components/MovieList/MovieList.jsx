import { Link } from "react-router-dom";
function MovieList({ movies, location }) {
  return (
    <ul>
      {movies.results.map((movie) => {
        return (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
export default MovieList;

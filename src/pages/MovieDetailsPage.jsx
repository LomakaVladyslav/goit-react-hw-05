import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieDetails } from "../tmdbApi";
import { useEffect, useState } from "react";
import css from "./MovieDetailsPage.module.css";
function MovieDetailsPage() {
  const location = useLocation();
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  useEffect(() => {
    const wrapper = async () => {
      const result = await getMovieDetails(movieId);

      setMovieDetails(result);
    };
    wrapper();
  }, [movieId]);
  return (
    <div>
      <Link to={location.state}>Go back</Link>
      {movieDetails && (
        <div>
          <div className={css.container}>
            <div className={css.image}>
              <img
                src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                alt=""
              />
            </div>
            <div>
              <h2>
                {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
              </h2>
              <p>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{movieDetails.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movieDetails.genres.map((genre) => {
                  return (
                    <li key={genre.id}>
                      <p>{genre.name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <p>Additional information</p>
          <ul>
            <li>
              <Link to="cast" state={location.state}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" state={location.state}>
                Reviews
              </Link>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
}
export default MovieDetailsPage;

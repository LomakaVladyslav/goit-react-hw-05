import { Link, useLocation } from 'react-router-dom';
import style from './MovieList.module.css';
import imgNotAvailable from '../../img/img_not_available.png';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p';

const MovieList = ({ films }) => {
  const location = useLocation();
  console.log('Location:', location);
  console.log('films:', films);

  return (
    <ul className={style.movieList}>
      {films.map(film => {
        const imgUrl = film.poster_path
          ? `${IMG_BASE_URL}/w185${film.poster_path}`
          : null;

        return (
          <li className={style.movieListItem} key={film.id}>
            <Link
              to={`/movies/${film.id}`}
              // state={{ from: `${location.pathname}${location.search}` }}
              state={location}
            >
              {imgUrl ? (
                <img src={imgUrl} alt={`${film.name}`} />
              ) : (
                <img
                  width="185px"
                  src={imgNotAvailable}
                  alt={`Image not available`}
                />
              )}
              <p className={style.title}>{film.title}</p>
              <p className={style.rating}>
                {film.release_date.split('-')[0]} year
              </p>
              <p className={style.rating}>
                Rating: {film.vote_average.toFixed(1)} / {film.vote_count}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;

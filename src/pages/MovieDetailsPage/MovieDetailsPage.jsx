import { useEffect, useRef, useState } from 'react';
import {
  useParams,
  useLocation,
  NavLink,
  Outlet,
  Link,
} from 'react-router-dom';
import { fetchFilmDetails } from '../../service/api';
import style from './MovieDetailsPage.module.css';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p';

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();

  const location = useLocation();

  const backLink = useRef(location.state ?? '/');

  const imgUrl = `${IMG_BASE_URL}${movieDetails.poster_path}`;
  console.log('Poster URL:', imgUrl);

  console.log(movieId);
  console.log('location:', location.pathname);
  console.log('movieDetails:', movieDetails);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchFilmDetails(movieId);
        setMovieDetails(response);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [movieId]);

  console.log('movieDetails:', movieDetails);

  return (
    <div className={style.container}>
      <div className={style.rowContainer}>
        <div className={style.posterContainer}>
          <Link to={backLink.current}>
            <button className={style.goBackBtn}>
              <MdOutlineKeyboardDoubleArrowLeft />
              Go back
            </button>
          </Link>
          <img
            src={`${IMG_BASE_URL}/w342${movieDetails.poster_path}`}
            alt="Movie Poster"
          />
        </div>

        <div className={style.overviewContainer}>
          <h2>{movieDetails.title}</h2>

          <p>
            <h3>Short overview:</h3> {movieDetails.overview}
          </p>
          <p>
            <h3>Genres:</h3>{' '}
            {movieDetails.genres?.map(genre => genre.name).join(', ')}
          </p>
          <p>Time (min): {movieDetails.runtime}</p>
          <p>Vote count: {movieDetails.vote_count}</p>
          <p>Vote average: {movieDetails.vote_average}</p>

          <div className={style.navlinkContainer}>
            <NavLink to={`/movies/${movieDetails.id}/cast`}>Cast</NavLink>
            <NavLink to={`/movies/${movieDetails.id}/reviews`}>Reviews</NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCasts } from '../../service/api.js';
import style from './MovieCast.module.css';
import imgNotAvailable from '../../img/img_not_available.png';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p';

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    const getData = async () => {
      try {
        const data = await fetchCasts(movieId);
        setMovieCast(data);
      } catch (error) {
        console.error('Error fetching casts:', error);
      }
    };

    getData();
  }, [movieId]);

  console.log('movieCast:', movieCast);

  return movieCast.length === 0 ? (
    <h2>There are no actors here.</h2>
  ) : (
    <ul className={style.castList}>
      {movieCast.map(cast => {
        const imgUrl = cast.profile_path
          ? `${IMG_BASE_URL}/w185${cast.profile_path}`
          : null;

        return (
          <li className={style.castItem} key={cast.id}>
            {imgUrl ? (
              <img src={imgUrl} alt={`${cast.name}`} />
            ) : (
              <img src={imgNotAvailable} alt={`Image not available`} />
            )}
            <p className={style.title}> {cast.name}</p>
            <p className={style.content}>Character: {cast.character}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;

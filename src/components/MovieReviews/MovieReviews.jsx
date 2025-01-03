import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { fetchReviews } from '../../service/api.js';
import style from './MovieReviews.module.css';

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const getData = async () => {
      try {
        const reviews = await fetchReviews(movieId);
        setMovieReviews(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    getData();
  }, [movieId]);

  console.log('Reviews:', movieReviews);

  return movieReviews.length === 0 ? (
    <h2>There are no reviews here yet.</h2>
  ) : (
    <ul className={style.reviewsList}>
      {Array.isArray(movieReviews) &&
        movieReviews.map(review => (
          <li key={review.id} className={style.reviewsItem}>
            <p className={style.title}>Author: {review.author}</p>
            <p className={style.content}>
              Created: {format(new Date(review.created_at), 'dd-MM-yyyy')}
            </p>
            <p className={style.title}>Review:</p> <p>{review.content}</p>
          </li>
        ))}
    </ul>
  );
};

export default MovieReviews;

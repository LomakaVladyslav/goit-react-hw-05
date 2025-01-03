import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../tmdbApi";

function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  useEffect(() => {
    const wrapper = async () => {
      const result = await getMovieReviews(movieId);
      setMovieReviews(result);
    };
    wrapper();
  }, [movieId]);
  if (movieReviews === null) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {movieReviews.results.length === 0
        ? "We don't have any reviews for this movie."
        : movieReviews.results.map((review) => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
    </ul>
  );
}
export default MovieReviews;

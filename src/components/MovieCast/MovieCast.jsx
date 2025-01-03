import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../tmdbApi";
import css from "./MovieCast.module.css";
function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  useEffect(() => {
    const wrapper = async () => {
      const result = await getMovieCredits(movieId);
      setMovieCast(result);
    };
    wrapper();
  }, []);
  return (
    <ul className={css.container}>
      {movieCast &&
        movieCast.cast.map((element) => (
          <li key={element.id} className={css.item}>
            <div className={css.image}>
              <img
                src={
                  element.profile_path === null
                    ? ""
                    : `https://image.tmdb.org/t/p/original/${element.profile_path}`
                }
                alt={`Could be photo of ${element.original_name}`}
              />
            </div>
            <p>{element.original_name}</p>
            <p>
              Character:{" "}
              {element.character === "" ? "No info" : element.character}
            </p>
          </li>
        ))}
    </ul>
  );
}
export default MovieCast;

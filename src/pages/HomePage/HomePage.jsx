import { useEffect } from 'react';
import { useState } from 'react';
import MovieList from '/src/components/MovieList/MovieList';
import { fetchMovies } from '../../service/api.js';
import style from './HomePage.module.css';

const HomePage = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetchMovies();
        setFilms(response);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    }
    getData();
  }, []);

  console.log('Films:', films);

  return (
    <div className={style.container}>
      <MovieList films={films} />
    </div>
  );
};

export default HomePage;

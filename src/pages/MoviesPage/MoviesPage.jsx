import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import { ProgressBar } from 'react-loader-spinner';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchMoviesSearch } from '../../service/api.js';
import style from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  // Юз эффект чтобы доставать значение query из урл и обновляем его в состоянии квери
  useEffect(() => {
    // Получаем параметр "query" из URL
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query') || '';

    // Если параметр "query" есть, обновляем состояние
    if (searchQuery) {
      setQuery(searchQuery);
      setPageNumber(1);
    }
  }, [location.search]);

  // Юз эффект чтобы вытягивать данные из строки запроса
  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMoviesSearch(query, pageNumber);
        setFilms(prevFilms =>
          pageNumber === 1
            ? response.data.results
            : [...prevFilms, ...response.data.results]
        );

        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [query, pageNumber]);

  console.log('Films API:', films);
  console.log('Total pages:', totalPages);

  // Add function for searchBar
  const handleSubmit = (values, { resetForm }) => {
    const searchQuery = values.search.trim();
    if (!searchQuery) {
      toast('Please fill search input!');
      return;
    }
    // Обновляем URL с параметром "query"
    navigate(`?query=${searchQuery}`);
    setQuery(searchQuery);
    setPageNumber(1);
    setFilms([]);
    resetForm();
  };

  return (
    <div className={style.container}>
      <SearchBar handleSubmit={handleSubmit} />
      {isLoading && <ProgressBar />}

      {films.length === 0 && query !== '' ? (
        <h2>We are sorry. There are no movies for this request!</h2>
      ) : (
        <MovieList films={films} />
      )}

      <Toaster />
    </div>
  );
};

export default MoviesPage;

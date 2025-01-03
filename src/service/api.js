import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTk5ZDJmOTZhNzQyZGFjNmQwZTdmZTk2ZjhhNDQ3MCIsIm5iZiI6MTczMjE5NTAyMy42NTI2ODI4LCJzdWIiOiI2NzNmMjkxOGNlNzE4NDM0ZjM4YmY3Y2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ikmXEl_aPErtIkp5ktT4TfQaPFWCYze-wNmhGATm_DY',
  },
});

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTk5ZDJmOTZhNzQyZGFjNmQwZTdmZTk2ZjhhNDQ3MCIsIm5iZiI6MTczMjIyMDg4NC45ODA5MzA2LCJzdWIiOiI2NzNmMjkxOGNlNzE4NDM0ZjM4YmY3Y2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dyjyV3Oa6sCrCcqOCRiUQpYI4SAwY1DLWVYdLlDvPgY',
  },
};

const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

export const fetchMovies = async () => {
  const response = await axios.get(url, options);
  return response.data.results;
};

export const fetchReviews = async movieId => {
  const response = await api.get(`3/movie/${movieId}/reviews?language=en-US`);
  return response.data.results;
};

export const fetchCasts = async movieId => {
  const response = await api.get(`3/movie/${movieId}/credits?language=en-US`);
  return response.data.cast;
};

export const fetchFilmDetails = async movieId => {
  const response = await api.get(`3/movie/${movieId}?language=en-US`);
  return response.data;
};

export const fetchMoviesSearch = async (query, pageNumber) => {
  const response = await api.get(
    `3/search/movie?query=${query}&include_adult=false&language=en-US&page=${pageNumber}&per_page=12`
  );
  return response;
};

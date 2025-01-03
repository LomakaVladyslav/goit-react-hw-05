import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDcxOWMwZTU5YWE0ZjgzZTI2YjEyMmVkOTI4ZjE0MyIsIm5iZiI6MTczNTkyMDcwMS45OTEwMDAyLCJzdWIiOiI2Nzc4MGMzZDM4ZDI2YTJhNjM3MjU5ZGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T1-t4WEYUa8Z8pq_oBL4DQgLudMX9CMwWU8-dRvC_Hg";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
export const getTrendMovies = async () => {
  const result = await axios("/trending/movie/day?language=en-US'");

  return result.data;
};
export const getMovieDetails = async (id) => {
  const result = await axios(`/movie/${id}`);
  return result.data;
};
export const getMovieCredits = async (id) => {
  const result = await axios(`/movie/${id}/credits`);
  return result.data;
};
export const getMovieReviews = async (id) => {
  const result = await axios(`/movie/${id}/reviews`);
  return result.data;
};
export const searchMovie = async (searchQ) => {
  const result = await axios("/search/movie", {
    params: {
      query: searchQ,
    },
  });
  return result.data;
};
